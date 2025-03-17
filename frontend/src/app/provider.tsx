'use client'

import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import I18nProvider from './providers/I18nProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
    <SessionProvider>
      <NextUIProvider>
      {children}
      </NextUIProvider>
    </SessionProvider>
    </I18nProvider>
  )
}