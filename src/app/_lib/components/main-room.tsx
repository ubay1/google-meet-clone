/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState, FC, useContext } from 'react'
import Peer from 'peerjs'
import { Avatar, Box, Button, Flex, Grid, IconButton, Separator, Text } from '@radix-ui/themes'
import { StreamContext } from '@lib/context/stream'
import { useSetupStore, useUserStore } from '@lib/stores/join-room'
import { Icon } from '@iconify/react'
import Clock from './Clock'

interface IProps {
  params: string
}

const MainRoom: FC<IProps> = ({ params }) => {
  const { ref1, ref2 } = useContext(StreamContext)
  // peer to peer
  const [peerId, setPeerId] = useState('')
  const [remotePeerId, setRemotePeerId] = useState('')
  const [remoteStream, setRemoteStream] = useState()
  const localVideoRef: any = useRef()
  const remoteVideoRef: any = useRef()

  let localVideoStream: any = null
  let localAudioStream: any = null

  const { name, roomName } = useUserStore()
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

  // useEffect(() => {
  //   if (ref1 && isCameraActive) {
  //     navigator.mediaDevices
  //       .getUserMedia({
  //         video: { deviceId: { exact: selectCameraType?.deviceId } },
  //       })
  //       .then((res) => {
  //         localVideoStream = res
  //         setOnOffCamera(localVideoStream, 'on')
  //       })
  //   }

  //   if (ref2 && isMicrophoneActive) {
  //     navigator.mediaDevices
  //       .getUserMedia({
  //         audio: { deviceId: { exact: selectMicrophoneType?.deviceId } },
  //       })
  //       .then((res) => {
  //         localAudioStream = res
  //         setOnOffMicrophone(localAudioStream, 'on')
  //       })
  //   }
  // }, [])

  useEffect(() => {
    if (ref1 && isCameraActive) {
      navigator.mediaDevices
        .getUserMedia({
          video: { deviceId: { exact: selectCameraType?.deviceId } },
          audio: { deviceId: { exact: selectMicrophoneType?.deviceId } },
        })
        .then((stream) => {
          ref1.current.srcObject = stream
          setCameraActive(true)
          setMicrophoneActive(true)
        })
    }
  }, [])

  useEffect(() => {
    const peer = new Peer(params)

    peer.on('call', (call) => {
      console.log('call = ', call)

      call.answer(ref1.current.srcObject)
      call.on('stream', (remoteStream: any) => {
        console.log('remoteStream - ', remoteStream)
        remoteVideoRef.current.srcObject = remoteStream
        setRemoteStream(remoteStream)
      })
    })
  }, [])

  // useEffect(() => {
  // const peer = new Peer()
  // // Initialize PeerJS
  // peer.on('open', (id) => {
  //   setPeerId(id)
  // })
  // peer.on('call', (call) => {
  //   navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
  //     localVideoRef.current.srcObject = stream
  //     call.answer(stream) // Answer the call with the local stream
  //     call.on('stream', (remoteStream: any) => {
  //       setRemoteStream(remoteStream)
  //     })
  //   })
  // })
  // peerInstance.current = peer
  // }, [])

  // useEffect(() => {
  //   if (remoteVideoRef.current && remoteStream) {
  //     remoteVideoRef.current.srcObject = remoteStream
  //   }
  // }, [remoteStream])

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
            {!isCameraActive && (
              <Flex position="absolute" justify="center" width="100%">
                <Avatar fallback={name.slice(0, 1)} size="8" radius="full" variant="solid" />
              </Flex>
            )}
            <video
              ref={ref1}
              autoPlay
              playsInline
              className="h-[calc(100%+2px)] w-[calc(100%+2px)] object-cover aspect-video scale-x-[-1] rounded-lg"
            ></video>
            <Box position="absolute" left="4" bottom="4">
              <Text size="3">{name}</Text>
            </Box>
          </Box>
        </Flex>
      </Flex>

      <Box className="fixed bottom-0 w-full h-20 bg-gray-800 px-4">
        <Grid columns="3" height="100%" className="grid-cols-1 sm:grid-cols-3">
          <Flex justify="start" align="center" gap="2" className="hidden sm:flex">
            <Clock />
            <Separator orientation="vertical" className="bg-white" />
            <Text size="4" truncate>
              {roomName}
            </Text>
          </Flex>

          <Flex justify="center" align="center" gap="2">
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
            <Box className="flex items-center gap-4">
              <IconButton
                variant="outline"
                color="gray"
                radius="full"
                size="3"
                className="cursor-pointer"
                onClick={startCamera}
              >
                <Icon icon="tabler:device-desktop-share" width={24} height={24} />
              </IconButton>
            </Box>
            <Box className="flex items-center gap-4">
              <IconButton
                variant="classic"
                color="red"
                radius="full"
                size="3"
                className="cursor-pointer"
                onClick={startCamera}
              >
                <Icon icon="majesticons:phone-hangup-line" width={24} height={24} />
              </IconButton>
            </Box>
          </Flex>

          <Flex justify="end" align="center" gap="2" className="hidden sm:flex">
            <Box className="flex items-center gap-4">
              <IconButton
                variant="ghost"
                color="gray"
                radius="full"
                size="4"
                className="cursor-pointer text-white"
                onClick={startCamera}
              >
                <Icon icon="mingcute:message-4-line" width={24} height={24} />
              </IconButton>
            </Box>
          </Flex>
        </Grid>
      </Box>
    </Box>
  )
}

export default MainRoom
