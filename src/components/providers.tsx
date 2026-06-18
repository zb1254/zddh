'use client'

import { SWRConfig } from 'swr'
import { SiteProvider } from './site-provider'
import { SitePopup } from './site-popup'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        provider: () => new Map(),
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      }}
    >
      <SiteProvider>
        {children}
        <SitePopup />
      </SiteProvider>
    </SWRConfig>
  )
}
