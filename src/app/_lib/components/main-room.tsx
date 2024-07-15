/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, FC, useContext } from 'react'
import Peer from 'peerjs'
import { Box, Button, Flex, IconButton } from '@radix-ui/themes'
import { StreamContext } from '@lib/context/stream'
import { useSetupStore } from '@lib/stores/join-room'
import { Icon } from '@iconify/react'

interface IProps {
  params: string
}

const MainRoom: FC<IProps> = () => {
  const { ref1, ref2 } = useContext(StreamContext)
  // peer to peer
  const [peerId, setPeerId] = useState('')
  const [remotePeerId, setRemotePeerId] = useState('')
  const [remoteStream, setRemoteStream] = useState()
  const peerInstance: any = useRef()
  const localVideoRef: any = useRef()
  const remoteVideoRef: any = useRef()

  let localVideoStream: any = null
  let localAudioStream: any = null

  const {
    statusPermissionCamera,
    statusPermissionMicrophone,
    isCameraActive,
    isMicrophoneActive,
    selectCameraType,
    selectMicrophoneType,
    setOpenDialogPermissionCameraDenied,
    setOpenDialogPermissionMicrophoneDenied,
    setErrorMsg,
    setCameraActive,
    setMicrophoneActive,
  } = useSetupStore()

  function handleErrorStream(error: { name: string }) {
    if (error.name === 'OverconstrainedError') {
      setErrorMsg(
        `OverconstrainedError: The constraints could not be satisfied by the available devices. Constraints: {video: true}`,
      )
    } else if (error.name === 'NotAllowedError') {
      setErrorMsg(
        'NotAllowedError: Permissions have not been granted to use your camera and ' +
          'microphone, you need to allow the page access to your devices in ' +
          'order for the demo to work.',
      )
    }
    // setErrorMsg(`getUserMedia error: ${error.name}`, error);
  }

  function setOnOffCamera(stream: any, status: 'on' | 'off') {
    if (status === 'on') {
      console.log('stream on  = ', stream)
      ref1.current.srcObject = stream
      setCameraActive(true)
    } else {
      const stream = ref1.current.srcObject
      console.log('stream off = ', stream)
      const tracks = stream.getTracks()
      tracks.forEach((track: any) => {
        track.stop()
      })
      ref1.current.srcObject = null
      setCameraActive(false)
    }
  }
  async function startCamera() {
    if (statusPermissionCamera === 'ditolak') {
      setOpenDialogPermissionCameraDenied(true)
    } else {
      try {
        if (!isCameraActive) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: selectCameraType?.deviceId } },
          })
          localVideoStream = stream
          setOnOffCamera(localVideoStream, 'on')
        } else {
          setOnOffCamera(localVideoStream, 'off')
        }
      } catch (error: any) {
        handleErrorStream(error)
      }
    }
  }

  function setOnOffMicrophone(stream: any, status: 'on' | 'off') {
    if (status === 'on') {
      // console.log("stream on  = ", stream);
      ref2.current.srcObject = stream
      setMicrophoneActive(true)
    } else {
      const stream = ref2.current.srcObject
      // console.log("stream off = ", stream);
      const tracks = stream.getTracks()
      tracks.forEach((track: any) => {
        track.stop()
      })
      ref2.current.srcObject = null
      setMicrophoneActive(false)
    }
  }
  async function startMicrophone() {
    // jika ditolak tampilkan dialog
    if (statusPermissionMicrophone === 'ditolak') {
      setOpenDialogPermissionMicrophoneDenied(true)
    } else {
      try {
        if (!isMicrophoneActive) {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: { deviceId: { exact: selectMicrophoneType?.deviceId } },
          })
          localAudioStream = stream
          setOnOffMicrophone(localAudioStream, 'on')
        } else {
          setOnOffMicrophone(localAudioStream, 'off')
        }
      } catch (error: any) {
        handleErrorStream(error)
      }
    }
  }

  function startMicAndCam() {
    startCamera()
    startMicrophone()
  }

  useEffect(() => {
    if (ref1 && isCameraActive) {
      navigator.mediaDevices
        .getUserMedia({
          video: { deviceId: { exact: selectCameraType?.deviceId } },
        })
        .then((res) => {
          localVideoStream = res
          setOnOffCamera(localVideoStream, 'on')
        })
    }

    if (ref2 && isMicrophoneActive) {
      navigator.mediaDevices
        .getUserMedia({
          audio: { deviceId: { exact: selectMicrophoneType?.deviceId } },
        })
        .then((res) => {
          localAudioStream = res
          setOnOffMicrophone(localAudioStream, 'on')
        })
    }
  }, [])

  useEffect(() => {
    const peer = new Peer()
    // Initialize PeerJS
    peer.on('open', (id) => {
      setPeerId(id)
    })
    peer.on('call', (call) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
        localVideoRef.current.srcObject = stream
        call.answer(stream) // Answer the call with the local stream
        call.on('stream', (remoteStream: any) => {
          setRemoteStream(remoteStream)
        })
      })
    })
    peerInstance.current = peer
  }, [])

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
    }
  }, [remoteStream])

  return (
    <Box className="h-screen w-full">
      <Flex justify="center" direction="column" gap="4" px="4" align="center" height="100%">
        <Flex
          gap={{ initial: '4', sm: '3' }}
          width={{ initial: '100%', md: '700px' }}
          direction={{ initial: 'column' }}
          className=""
        >
          <Box
            width={{ initial: '100%' }}
            height={{ initial: '400px' }}
            className="relative rounded-lg bg-gray-800 text-white flex justify-center items-center"
          >
            <audio ref={ref2} hidden controls autoPlay playsInline></audio>
            <video
              ref={ref1}
              autoPlay
              playsInline
              className="h-[calc(100%+2px)] w-[calc(100%+2px)] object-cover aspect-video scale-x-[-1] rounded-lg"
            ></video>

            <Box className="absolute bottom-4 flex items-center flex-col gap-4">
              {statusPermissionCamera !== 'aktif' || statusPermissionMicrophone !== 'aktif' ? (
                <Button
                  variant="classic"
                  size="3"
                  radius="full"
                  className="cursor-pointer disabled:cursor-not-allowed w-auto"
                  onClick={startMicAndCam}
                >
                  Allow camera & microphone
                </Button>
              ) : (
                <></>
              )}

              <Box className="flex items-center gap-4">
                <Box className="flex items-center gap-4">
                  <IconButton
                    variant={isMicrophoneActive ? 'outline' : 'classic'}
                    color={isMicrophoneActive ? 'gray' : 'red'}
                    radius="full"
                    size="3"
                    className="cursor-pointer"
                    onClick={startMicrophone}
                  >
                    {isMicrophoneActive ? (
                      <Icon icon="mage:microphone" width={24} height={24} />
                    ) : (
                      <Icon icon="mage:microphone-mute" width={24} height={24} />
                    )}
                  </IconButton>
                </Box>

                <Box className="flex items-center gap-4">
                  <IconButton
                    variant={isCameraActive ? 'outline' : 'classic'}
                    color={isCameraActive ? 'gray' : 'red'}
                    radius="full"
                    size="3"
                    className="cursor-pointer"
                    onClick={startCamera}
                  >
                    {isCameraActive ? (
                      <Icon icon="fluent:video-32-regular" width={24} height={24} />
                    ) : (
                      <Icon icon="fluent:video-off-32-regular" width={24} height={24} />
                    )}
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

export default MainRoom
