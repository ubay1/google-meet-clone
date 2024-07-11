'use client'

import { useRouter } from 'next/navigation'
import { Box, Button, Container, Flex, Heading, Section, Text, TextField } from '@radix-ui/themes'
import { Icon } from '@iconify/react'
import { ChangeEvent, useState } from 'react'
import { useTheme } from 'next-themes'
// import Image from "next/image";

export default function Home() {
  const { theme } = useTheme()
  const [kode, setKode] = useState<string>('')
  const router = useRouter()

  return (
    <Box className=" h-screen w-full">
      <Flex justify="center" direction="column" gap="4" align="center" height="100%">
        <Icon
          icon="fluent:video-chat-16-filled"
          width={100}
          height={100}
          color={theme === 'dark' ? '#1cc898' : '#008e6a'}
        />
        <Heading size="8" className="text-center text-balance">
          Rapat dan panggilan video untuk semua orang
        </Heading>
        <Text as="div" size="4" className="text-center text-balance">
          Terhubung, berkolaborasi, dan merayakan dari mana saja dengan Google Meet
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
            onClick={() => router.push('/setup')}
          >
            <Icon icon="mage:video-plus" width={20} height={20} />
            <Text as="div" size="3" className="text-center text-balance">
              Mulai meet
            </Text>
          </Button>
          <Flex
            justify="center"
            gap="4"
            align="center"
            className="flex-col w-full md:flex-row md:w-auto"
          >
            <TextField.Root
              placeholder="Masukkan kode room"
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
