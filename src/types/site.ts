export interface HeaderLink {
  icon: string
  href: string
  ariaLabel: string
}

export interface PopupConfig {
  enabled: boolean
  title: string
  content: string
  imageUrl: string
  linkUrl: string
  linkText: string
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
  popup?: PopupConfig
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
  popup?: PopupConfig
} 