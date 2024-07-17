export function mediaStreamToObject(mediaStream: {
  getAudioTracks: () => any[]
  getVideoTracks: () => any[]
  id: any
}) {
  const audioTracks = mediaStream
    .getAudioTracks()
    .map(
      (track: {
        kind: any
        label: any
        enabled: any
        id: any
        getConstraints: () => any
        getSettings: () => any
      }) => ({
        kind: track.kind,
        label: track.label,
        enabled: track.enabled,
        id: track.id,
        constraints: track.getConstraints(),
        settings: track.getSettings(),
      }),
    )

  const videoTracks = mediaStream
    .getVideoTracks()
    .map(
      (track: {
        kind: any
        label: any
        enabled: any
        id: any
        getConstraints: () => any
        getSettings: () => any
      }) => ({
        kind: track.kind,
        label: track.label,
        enabled: track.enabled,
        id: track.id,
        constraints: track.getConstraints(),
        settings: track.getSettings(),
      }),
    )

  return {
    id: mediaStream.id,
    audioTracks,
    videoTracks,
  }
}

export function removeLastDuplicate(peers: any) {
  const seen = new Set()

  // Iterate from the end of the array to the beginning
  for (let i = peers.length - 1; i >= 0; i--) {
    if (seen.has(peers[i].id)) {
      // If the ID is already seen, remove this element
      peers.splice(i, 1)
    } else {
      // Add the ID to the seen set
      seen.add(peers[i].id)
    }
  }

  return peers
}
