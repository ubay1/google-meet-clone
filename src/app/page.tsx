'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import Peer from 'peerjs'
import { Box, Button, Flex, Heading, Text, TextField } from '@radix-ui/themes'
import { Icon } from '@iconify/react'
import { generateUUID } from '@lib/helpers/generate-id'
import ThemeToogle from '@lib/components/theme-toggle'
import { NewPeerProvider, useNewPeer } from '@lib/context/peer2'

const Content = () => {
  const { theme } = useTheme()
  const router = useRouter()

  const { peerUser, setPeerUser } = useNewPeer()

  const [kode, setKode] = useState<string>('')

  function gotoRoom() {
    const id = generateUUID()
    router.push('/room/' + id)
  }

  // watched
  useEffect(() => {
    if (peerUser) {
      console.log('peerUser = ', peerUser)
    }
  }, [peerUser])

  // mounted
  useEffect(() => {
    const peer = new Peer()
    setPeerUser(peer)
  }, [setPeerUser])

  return (
    <Box className=" h-screen w-full">
      <Flex justify="center" direction="column" gap="4" align="center" height="100%">
        <Flex justify="center" gap="4" align="center">
          <Icon
            icon="noto:smiling-face-with-open-mouth-and-closed-eyes"
            width={100}
            height={100}
            color={theme === 'dark' ? '#1cc898' : '#008e6a'}
          />
          <Icon
            icon="noto:face-with-stuck-out-tongue-and-winking-eye"
            width={100}
            height={100}
            color={theme === 'dark' ? '#1cc898' : '#008e6a'}
          />
        </Flex>
        <Heading size="8" className="text-center text-balance">
          Kongko
        </Heading>
        <Text as="div" size="4" className="text-center text-balance">
          Mengobrol dan bersenda gurau dari mana saja
        </Text>
        <Flex
          justify="center"
          gap="4"
          align="center"
          className="flex-col w-full md:flex-row"
          px="4"
        >
          <Button
            variant="classic"
            size="3"
            className="cursor-pointer w-full sm:w-1/2 md:w-auto"
            onClick={gotoRoom}
          >
            <Icon icon="mage:video-plus" width={20} height={20} />
            <Text as="div" size="3" className="text-center text-balance">
              Bikin tempat kongko
            </Text>
          </Button>
          <Flex
            justify="center"
            gap="4"
            align="center"
            className="flex-col w-full md:flex-row md:w-auto"
          >
            <TextField.Root
              placeholder="Masukkan kode kongko"
              size="3"
              className="w-full sm:w-1/2 md:w-[240px]"
              value={kode || ''}
              onChange={(e) => setKode(e.target.value)}
            >
              <TextField.Slot>
                <Icon icon="gravity-ui:keyboard" width={20} height={20} />
              </TextField.Slot>
            </TextField.Root>
            <Button
              variant="classic"
              disabled={kode?.length === 0 ? true : false}
              size="3"
              className="w-full cursor-pointer disabled:cursor-not-allowed sm:w-1/2 md:w-auto"
            >
              Gabung
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default function Home() {
  return (
    <NewPeerProvider>
      <Content />
      <ThemeToogle />
    </NewPeerProvider>
  )
}
