/** @type {import('next').NextConfig} */
const nextConfig = {
  // OpenNext handles the output format for Cloudflare Pages

  // Don't fail build on ESLint warnings
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: [
      'dash.cloudflare.com',
      'www.google.com',
      'ph-static.imgix.net',
      'app.leonardo.ai'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost', '*.pages.dev', 'newkit.site', 'dh.imba.mba']
    },
    optimizePackageImports: ['lucide-react', 'date-fns', 'lodash']
  }
}

module.exports = nextConfig
