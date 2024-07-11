'use client'

import { useTheme } from 'next-themes'
import { Icon } from '@iconify/react'
import { FC } from 'react'
import { IconButton } from '@radix-ui/themes'

const ButtonTheme: FC<{ isTheme: string | undefined }> = ({ isTheme }) => {
  const { setTheme } = useTheme()

  if (isTheme === 'light') {
    return (
      <IconButton variant="classic" size="3" radius="full" onClick={() => setTheme('dark')}>
        <Icon icon="ph:moon" width={17} height={17} />
      </IconButton>
    )
  } else {
    return (
      <IconButton variant="classic" size="3" radius="full" onClick={() => setTheme('light')}>
        <Icon icon="ph:sun" width={17} height={17} />
      </IconButton>
    )
  }
}

export default function ThemeToogle() {
  const { theme } = useTheme()

  return (
    <div className="fixed bottom-4 right-4">
      <ButtonTheme isTheme={theme} />
    </div>
  )
}
