'use client'

import { NextUIProvider } from '@nextui-org/react'
import { SessionProvider } from 'next-auth/react'
import I18nProvider from './providers/I18nProvider'
import { SearchResultProvider } from './providers/searchResultProvider'


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
    <SessionProvider>
      <NextUIProvider>
        <SearchResultProvider>
          {children}
        </SearchResultProvider>
      </NextUIProvider>
    </SessionProvider>
    </I18nProvider>
  )
}