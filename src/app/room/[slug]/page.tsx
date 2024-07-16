'use client'

import { useSetupStore } from '@lib/stores/join-room'
import MainRoom from '@lib/components/main-room'
import Setup from '@lib/components/setup-v2'
import { StreamContextProvider } from '@lib/context/stream'
import { SimplePeerProvider } from '@lib/context/simple-peer'

export default function App({ params }: { params: { slug: string } }) {
  return !useSetupStore().finishSetup ? (
    <StreamContextProvider>
      <SimplePeerProvider>
        <Setup params={params.slug} />
      </SimplePeerProvider>
    </StreamContextProvider>
  ) : (
    <StreamContextProvider>
      <SimplePeerProvider>
        <MainRoom params={params.slug} />
      </SimplePeerProvider>
    </StreamContextProvider>
  )
}
