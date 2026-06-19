import { NextResponse } from 'next/server'
import type { SiteConfig, SiteInfo } from '@/types/site'
import { getFileContent } from '@/lib/github'

function defaultConfig(): SiteConfig {
  return {
    basic: { title: 'NavSphere', description: 'A modern navigation platform', keywords: 'navigation, platform, web, management' },
    appearance: { logo: '/logo.png', favicon: '/favicon.ico', theme: 'system' },
    navigation: { linkTarget: '_blank' },
    headerLinks: [],
    popup: { enabled: false, title: '', content: '', imageUrl: '', linkUrl: '', linkText: '' }
  }
}

export async function GET() {
  try {
    const data = await getFileContent('src/navsphere/content/site.json') as SiteInfo | Record<string, never>
    const config: SiteConfig = {
      ...defaultConfig(),
      ...data,
      headerLinks: data?.headerLinks ?? [],
      popup: { ...defaultConfig().popup, ...data?.popup }
    }
    return NextResponse.json(config)
  } catch (error) {
    console.error('Error fetching site config:', error)
    return NextResponse.json(defaultConfig())
  }
}
