'use client'

import { useSetupStore } from '@lib/stores/join-room'
import MainRoom from '@lib/components/main-room'
import MainRoomV2 from '@lib/components/main-room-v2'
import SetupV3 from '@lib/components/setup-v3'
import SetupV2 from '@lib/components/setup-v2'
import { StreamContextProvider } from '@lib/context/stream'
import { PeerProvider } from '@lib/context/peer'
import { NewPeerProvider } from '@lib/context/peer2'

export default function App({ params }: { params: { slug: string } }) {
  return !useSetupStore().finishSetup ? (
    <StreamContextProvider>
      {/* <PeerProvider>
        <SetupV2 params={params.slug} />
      </PeerProvider> */}
      <NewPeerProvider>
        <SetupV3 params={params.slug} />
      </NewPeerProvider>
    </StreamContextProvider>
  ) : (
    <StreamContextProvider>
      <NewPeerProvider>
        <MainRoomV2 params={params.slug} />
      </NewPeerProvider>
    </StreamContextProvider>
  )
}
