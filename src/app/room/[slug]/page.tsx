'use client'

import { useSetupStore } from '@lib/stores/join-room'
import MainRoom from '@lib/components/main-room'
import Setup from '@lib/components/setup-v2'
import { StreamContextProvider } from '@lib/context/stream'
import { PeerProvider } from '@lib/context/peer'

export default function App({ params }: { params: { slug: string } }) {
  return !useSetupStore().finishSetup ? (
    <StreamContextProvider>
      <PeerProvider>
        <Setup params={params.slug} />
      </PeerProvider>
    </StreamContextProvider>
  ) : (
    <StreamContextProvider>
      <MainRoom params={params.slug} />
    </StreamContextProvider>
  )
}
