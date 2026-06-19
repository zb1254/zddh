import { NextResponse } from 'next/server'
import type { SiteConfig } from '@/types/site'
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
    const fileData = await getFileContent('src/navsphere/content/site.json')
    const def = defaultConfig()
    const config: SiteConfig = {
      basic: { ...def.basic, ...fileData?.basic },
      appearance: { ...def.appearance, ...fileData?.appearance },
      navigation: { ...def.navigation, ...fileData?.navigation },
      headerLinks: fileData?.headerLinks ?? [],
      popup: { ...def.popup, ...fileData?.popup },
    }
    return NextResponse.json(config)
  } catch (error) {
    console.error('Error fetching site config:', error)
    return NextResponse.json(defaultConfig())
  }
}
