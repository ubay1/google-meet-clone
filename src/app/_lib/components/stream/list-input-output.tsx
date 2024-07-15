import { Box, Grid, Select } from '@radix-ui/themes'
import { useSetupStore } from '@lib/stores/join-room'
import { InputOutput } from '../../types/permissions'
import { Icon } from '@iconify/react'
import { FC } from 'react'

interface IProps {
  ref1: any
  ref2: any
  setOnOffCamera: Function
  setOnOffMicrophone: Function
  setLocalVideoStream: Function
  setLocalAudioStream: Function
}
const ListInputOutput: FC<IProps> = ({
  ref1,
  ref2,
  setOnOffCamera,
  setOnOffMicrophone,
  setLocalVideoStream,
  setLocalAudioStream,
}) => {
  const {
    statusPermissionCamera,
    statusPermissionMicrophone,
    isCameraActive,
    isMicrophoneActive,
    selectCameraType,
    selectSpeakerType,
    selectMicrophoneType,
    listCameraType,
    listMicrophoneType,
    listSpeakerType,
    setSpeakerType,
    setMicrophoneType,
    setCameraType,
  } = useSetupStore()

  // Attach audio output device to video element using device/sink ID.
  function attachSinkId(localVideoElement: any, lastDeviceIdSpeaker: string) {
    // console.log('localVideoElement.sinkId = ', localVideoElement.current)
    // console.log("lastDeviceIdSpeaker = ", lastDeviceIdSpeaker);
    // console.log("HTMLMediaElement.prototype = ", HTMLMediaElement.prototype);

    if ('sinkId' in HTMLMediaElement.prototype) {
      localVideoElement.current
        .setSinkId(lastDeviceIdSpeaker)
        .then(() => {
          console.log('Success, audio output device attached: ', lastDeviceIdSpeaker)
        })
        .catch((error: any) => {
          console.log('Error attaching audio output device: ', error)
        })
    } else {
      console.log('Browser does not support output device selection.')
    }
  }

  function onChangeSpeaker(deviceId: string) {
    // console.log(deviceId);
    const getTypeSpeaker = listSpeakerType.filter(
      (data: InputOutput) => data.deviceId === deviceId,
    )[0]
    console.log(getTypeSpeaker)

    setSpeakerType(getTypeSpeaker)
    const audioDestination = selectSpeakerType?.deviceId ?? ''
    attachSinkId(ref1, audioDestination)
  }

  // change microphone
  async function onChangeMicrophone(deviceId: string) {
    // console.log(deviceId);
    const getTypeMic = listMicrophoneType.filter(
      (data: InputOutput) => data.deviceId === deviceId,
    )[0]
    setMicrophoneType(getTypeMic)
    // cek state isMicrophoneActive
    if (isMicrophoneActive) {
      const stream = ref2.current.srcObject
      // console.log("stream off = ", stream);
      const tracks = stream.getTracks()
      tracks.forEach((track: any) => {
        track.stop()
      })
      ref2.current.srcObject = null

      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: { exact: selectMicrophoneType?.deviceId } },
      })
      // localAudioStream = newStream
      setLocalAudioStream(newStream)
      setOnOffMicrophone(newStream, 'on')

      // console.log(stream);
    }
  }

  // change camera
  async function onChangeCamera(deviceId: string) {
    // console.log(deviceId);
    const getTypeCam = listCameraType.filter((data: InputOutput) => data.deviceId === deviceId)[0]
    setCameraType(getTypeCam)
    // cek state isMicrophoneActive
    if (isCameraActive) {
      const stream = ref1.current.srcObject
      // console.log("stream off = ", stream);
      const tracks = stream.getTracks()
      tracks.forEach((track: any) => {
        track.stop()
      })
      ref1.current.srcObject = null

      const newStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: selectMicrophoneType?.deviceId } },
      })
      // localVideoStream = newStream
      setLocalVideoStream(newStream)
      setOnOffCamera(newStream, 'on')

      // console.log(stream);
    }
  }

  return (
    <Box>
      <Grid columns={{ initial: '1', sm: '3', md: '3' }} gap="3">
        <Select.Root
          defaultValue="default"
          value={selectMicrophoneType?.deviceId}
          disabled={statusPermissionMicrophone !== 'aktif'}
          onValueChange={onChangeMicrophone}
        >
          <Select.Trigger
            variant="classic"
            radius="full"
            className={statusPermissionMicrophone !== 'aktif' ? 'opacity-20' : 'opacity-100'}
          >
            <div className="grid grid-cols-[auto_calc(100%-20px)] gap-2">
              <Icon icon="mage:microphone" width={18} height={18} />
              <div className="w-auto truncate">
                {statusPermissionMicrophone !== 'aktif'
                  ? 'Izin diperlukan'
                  : selectMicrophoneType?.label}
              </div>
            </div>
          </Select.Trigger>
          <Select.Content position="popper">
            {listMicrophoneType.length > 0 &&
              listMicrophoneType.map((item: any, idx: number) => (
                <Select.Item key={`${item.deviceId}-${idx}`} value={item.deviceId}>
                  {item.label}
                </Select.Item>
              ))}
          </Select.Content>
        </Select.Root>
        <Select.Root
          defaultValue="default"
          value={selectSpeakerType?.deviceId}
          disabled={statusPermissionMicrophone !== 'aktif'}
          onValueChange={onChangeSpeaker}
        >
          <Select.Trigger
            variant="classic"
            radius="full"
            className={statusPermissionMicrophone !== 'aktif' ? 'opacity-20' : 'opacity-100'}
          >
            <div className="grid grid-cols-[auto_calc(100%-20px)] gap-2">
              <Icon icon="mage:volume-up" width={18} height={18} />
              <div className="w-auto truncate">
                {statusPermissionMicrophone !== 'aktif'
                  ? 'Izin diperlukan'
                  : selectSpeakerType?.label}
              </div>
            </div>
          </Select.Trigger>
          <Select.Content position="popper">
            {listSpeakerType.length > 0 &&
              listSpeakerType.map((item: any, idx: number) => (
                <Select.Item key={`${item.deviceId}-${idx}`} value={item.deviceId}>
                  {item.label}
                </Select.Item>
              ))}
          </Select.Content>
        </Select.Root>
        <Select.Root
          defaultValue="default"
          value={selectCameraType?.deviceId}
          disabled={statusPermissionCamera !== 'aktif'}
          onValueChange={onChangeCamera}
        >
          <Select.Trigger
            variant="classic"
            radius="full"
            className={statusPermissionCamera !== 'aktif' ? 'opacity-20' : 'opacity-100'}
          >
            <div className="grid grid-cols-[auto_calc(100%-20px)] gap-2">
              <Icon icon="mage:video" width={18} height={18} />
              <div className="w-auto truncate">
                {statusPermissionCamera !== 'aktif' ? 'Izin diperlukan' : selectCameraType?.label}
              </div>
            </div>
          </Select.Trigger>
          <Select.Content position="popper">
            {listCameraType.length > 0 &&
              listCameraType.map((item: any, idx: number) => (
                <Select.Item key={`${item.deviceId}-${idx}`} value={item.deviceId}>
                  {item.label}
                </Select.Item>
              ))}
          </Select.Content>
        </Select.Root>
      </Grid>
    </Box>
  )
}

export default ListInputOutput
