export const checkPermission = async (permissionName: 'camera' | 'microphone'): Promise<string> => {
  try {
    const permissionStatus = await navigator.permissions.query({
      name: permissionName as PermissionName,
    })
    console.log(`Status izin ${permissionName}:`, permissionStatus.state)

    if (permissionStatus.state === 'granted') {
      console.log(`Izin ${permissionName} aktif.`)
      return 'aktif'
    } else if (permissionStatus.state === 'denied') {
      console.log(`Izin ${permissionName} ditolak.`)
      return 'ditolak'
    } else {
      console.log(`Izin ${permissionName} belum diberikan.`)
      return 'belum-aktif'
    }
  } catch (error) {
    console.error(`Error memeriksa izin ${permissionName}:`, error)
    throw error // Re-throw the error if needed
  }
}

// check value
export const isEmpty = (value: any) => [null, undefined, ''].includes(value)
