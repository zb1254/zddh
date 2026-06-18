export interface HeaderLink {
  icon: string
  href: string
  ariaLabel: string
}

export interface SiteConfig {
  basic: {
    title: string
    description: string
    keywords: string
  }
  appearance: {
    logo: string
    favicon: string
    theme: 'light' | 'dark' | 'system'
  }
  navigation: {
    linkTarget: '_blank' | '_self'
  }
  headerLinks?: HeaderLink[]
}

export interface SiteInfo {
  basic: {
    title: string
    description: string
    keywords: string
  }
  appearance: {
    logo: string
    favicon: string
    theme: string
  }
  navigation: {
    linkTarget: string
  }
  headerLinks?: HeaderLink[]
} 