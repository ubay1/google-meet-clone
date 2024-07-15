import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import '@lib/css/globals.css'
import ThemeToogle from '@/app/_lib/components/theme-toggle'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Google Meet Clone',
  description: 'G-Meet Clone With NextJS',
  icons: '/assets/images/fav.svg',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <ThemeProvider attribute="class">
          <Theme accentColor="jade">
            {children}
            <ThemeToogle />
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  )
}
