import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { InputOutput, statusPermissions } from '@lib/types/permissions'

interface UserState {
  roomName: string
  name: string
  setRoomName: (value: string) => void
  setName: (value: string) => void
}
export const useUserStore = create<UserState>()(
  devtools(
    // persist(
    (set) => ({
      roomName: '',
      name: '',
      setRoomName: (value: string) => set(() => ({ roomName: value })),
      setName: (value: string) => set(() => ({ name: value })),
    }),
    { name: 'user-storage' },
    // ),
  ),
)

interface SetupState {
  finishSetup: boolean
  errorMsg: string
  localVideo: any
  localVideoStream: any
  localAudio: any
  localAudioStream: any
  statusPermissionCamera: statusPermissions
  statusPermissionMicrophone: statusPermissions
  isCameraActive: boolean
  isMicrophoneActive: boolean
  openDialogPermissionCameraDenied: boolean
  openDialogPermissionMicrophoneDenied: boolean
  selectCameraType: InputOutput | undefined
  selectMicrophoneType: InputOutput | undefined
  selectSpeakerType: InputOutput | undefined
  listCameraType: InputOutput[]
  listMicrophoneType: InputOutput[]
  listSpeakerType: InputOutput[]
  setFinishSetup: (value: boolean) => void
  setErrorMsg: (value: string) => void
  setLocalVideoStream: (value: any) => void
  setLocalAudioStream: (value: any) => void
  setStatusPermissionCamera: (value: statusPermissions) => void
  setStatusPermissionMicrophone: (value: statusPermissions) => void
  setCameraActive: (value: boolean) => void
  setMicrophoneActive: (value: boolean) => void
  setOpenDialogPermissionCameraDenied: (value: boolean) => void
  setOpenDialogPermissionMicrophoneDenied: (value: boolean) => void
  setCameraType: (value: InputOutput) => void
  setMicrophoneType: (value: InputOutput) => void
  setSpeakerType: (value: InputOutput) => void
  setListCameraType: (value: InputOutput) => void
  setListMicrophoneType: (value: InputOutput) => void
  setListSpeakerType: (value: InputOutput) => void
}
export const useSetupStore = create<SetupState>()(
  devtools(
    (set) => ({
      finishSetup: false,
      errorMsg: '',
      localVideo: null,
      localAudio: null,
      localVideoStream: null,
      localAudioStream: null,
      statusPermissionCamera: 'belum-aktif',
      statusPermissionMicrophone: 'belum-aktif',
      isCameraActive: false,
      isMicrophoneActive: false,
      openDialogPermissionCameraDenied: false,
      openDialogPermissionMicrophoneDenied: false,
      selectCameraType: undefined,
      selectMicrophoneType: undefined,
      selectSpeakerType: undefined,
      listCameraType: [],
      listMicrophoneType: [],
      listSpeakerType: [],
      setFinishSetup: (value: boolean) => set(() => ({ finishSetup: value })),
      setErrorMsg: (value: string) => set(() => ({ errorMsg: value })),
      setLocalVideoStream: (value: string) => set(() => ({ localVideoStream: value })),
      setLocalAudioStream: (value: string) => set(() => ({ localAudioStream: value })),
      setStatusPermissionCamera: (value: statusPermissions) =>
        set(() => ({ statusPermissionCamera: value })),
      setStatusPermissionMicrophone: (value: statusPermissions) =>
        set(() => ({ statusPermissionMicrophone: value })),
      setCameraActive: (value: boolean) => set(() => ({ isCameraActive: value })),
      setMicrophoneActive: (value: boolean) => set(() => ({ isMicrophoneActive: value })),
      setOpenDialogPermissionCameraDenied: (value: boolean) =>
        set(() => ({ openDialogPermissionCameraDenied: value })),
      setOpenDialogPermissionMicrophoneDenied: (value: boolean) =>
        set(() => ({ openDialogPermissionMicrophoneDenied: value })),
      setCameraType: (value: InputOutput) => set(() => ({ selectCameraType: value })),
      setMicrophoneType: (value: InputOutput) => set(() => ({ selectMicrophoneType: value })),
      setSpeakerType: (value: InputOutput) => set(() => ({ selectSpeakerType: value })),
      setListCameraType: (data: InputOutput) =>
        set((state) => ({ listCameraType: [...state.listCameraType, data] })),
      setListMicrophoneType: (data: InputOutput) =>
        set((state) => ({ listMicrophoneType: [...state.listMicrophoneType, data] })),
      setListSpeakerType: (data: InputOutput) =>
        set((state) => ({ listSpeakerType: [...state.listSpeakerType, data] })),
    }),
    { name: 'setup-storage' },
  ),
)

interface PeerState {
  peer: any
  conn: any
  call: any
  myStream: any
  remoteStream: any
  id: any
  connectedPeers: string[]
  setPeer: (value: any) => void
  setConn: (value: any) => void
  setCall: (value: any) => void
  setMyStream: (value: any) => void
  setRemoteStream: (value: any) => void
  setId: (value: any) => void
  setConnectedPeers: (value: any) => void
}
export const usePeerStore = create<PeerState>()(
  devtools(
    (set) => ({
      peer: null,
      conn: null,
      call: null,
      myStream: null,
      remoteStream: null,
      id: null,
      connectedPeers: [],
      setPeer: (value: any) => set(() => ({ peer: value })),
      setConn: (value: any) => set(() => ({ conn: value })),
      setCall: (value: any) => set(() => ({ call: value })),
      setMyStream: (value: any) => set(() => ({ myStream: value })),
      setRemoteStream: (value: any) => set(() => ({ remoteStream: value })),
      setId: (value: any) => set(() => ({ id: value })),
      setConnectedPeers: (data: any) => set((state) => ({ conn: [...state.connectedPeers, data] })),
    }),
    { name: 'peer-storage' },
  ),
)
