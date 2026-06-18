import { NextResponse } from 'next/server'
import type { SiteConfig } from '@/types/site'
import siteDataRaw from '@/navsphere/content/site.json'

export async function GET() {
  try {
    const config: SiteConfig = {
      ...(siteDataRaw as SiteConfig),
      popup: {
        enabled: false,
        title: '',
        content: '',
        imageUrl: '',
        linkUrl: '',
        linkText: '',
        ...(siteDataRaw as any).popup
      }
    }
    return NextResponse.json(config)
  } catch (error) {
    console.error('Error fetching site config:', error)
    const defaultConfig: SiteConfig = {
      basic: { title: 'NavSphere', description: 'A modern navigation platform', keywords: 'navigation, platform, web, management' },
      appearance: { logo: '/logo.png', favicon: '/favicon.ico', theme: 'system' },
      navigation: { linkTarget: '_blank' },
      headerLinks: [],
      popup: { enabled: false, title: '', content: '', imageUrl: '', linkUrl: '', linkText: '' }
    }
    return NextResponse.json(defaultConfig)
  }
}
