# NavSphere - Content Navigation Platform

<p align="center">
  <strong>Video Navigation + Website Navigation</strong>
</p>

<p align="center">
  <a href="./README.md">简体中文</a> | <strong>English</strong>
</p>

## 📖 Introduction

NavSphere is a modern navigation management platform built with Next.js 15, integrating **Video Navigation** and **Website Navigation** as core features. Designed for content collection, categorization, and management, it provides a secure and reliable navigation data management experience using GitHub as the data storage backend.

### Dual Core Features

#### 🎬 Video Navigation
Focus on video content collection and organization, supporting video management for Bilibili and YouTube platforms.

#### 🔖 Website Navigation
Comprehensive website bookmark management system to help you collect and organize commonly used websites, online tools, and resources.

### Core Highlights

- 🎬 **Multi-Platform Video Support**: Perfect support for Bilibili and YouTube video playback
- 🔖 **Website Navigation Management**: Collect and manage your favorite websites and online tools
- 📊 **Category Management**: Flexible category and subcategory system with unlimited hierarchy
- 🎨 **Modern Interface**: Beautiful UI based on Radix UI and Tailwind CSS
- 🔐 **Username & Password Login**: Secure login with configured admin credentials
- 📱 **Responsive Design**: Perfect adaptation for desktop and mobile
- 🌓 **Theme Switching**: Support for dark/light themes
- 🎯 **Smart Icons**: Automatically fetch website Favicons
- ⚡ **High Performance**: Deployed on Cloudflare Workers edge network

## ✨ Core Features

### Video Management

- 🎥 **Video Categorization**: Support for multi-level categories and subcategories, flexible video content organization
- 🎯 **Video Configuration**: Automatically identify Bilibili and YouTube video links and extract video information
- 🖼️ **Cover Management**: Support for custom upload of video cover images
- 🎬 **Embedded Playback**: Support for direct playback of Bilibili and YouTube videos within the site
- 📝 **Detailed Information**: Add title, description, and other details for each video
- 🔄 **Drag & Drop Sorting**: Easily adjust the order of videos and categories through drag and drop

### Website Navigation

- 🔖 **Website Collection**: Quickly collect and manage your favorite websites
- 📂 **Category Organization**: Create main categories and subcategories with unlimited hierarchy
- 🎨 **Smart Icons**: Automatically fetch website Favicons or manually upload
- 📝 **Detailed Description**: Add title, description, and other information for each website
- 🔍 **Quick Search**: Quickly locate websites through keywords
- 🎯 **One-Click Access**: Click to jump to the target website
- 🏷️ **Tag Management**: Better organize content using icons and tags
- 🔄 **Drag & Drop Sorting**: Freely adjust the display order of websites and categories

### Admin Dashboard

- 👨‍💼 **Unified Management**: Unified admin system for videos and websites
- ➕ **Quick Add**:
  - **Videos**: Paste video link to add Bilibili or YouTube videos
  - **Websites**: Enter URL to automatically fetch website information
- ✏️ **Edit Features**:
  - Modify title, description, and icons
  - Adjust category attribution
  - Upload custom covers/icons
- 🗂️ **Category Management**: Create, edit, and delete categories and subcategories
- 📊 **Visual Editing**: Monaco Editor supports direct JSON data editing
- 🔍 **Smart Search**: Quickly locate content and categories
- 🎨 **Icon Selection**: Integrated Lucide Icons library

### Technical Features

- 🚀 **Modern Tech Stack**: Next.js 15 + React 18 + TypeScript
- 🎨 **UI Component Library**: Radix UI + shadcn/ui
- 🎭 **Icon System**: Lucide React icon library
- 📦 **State Management**: React Query for data fetching and caching
- 🔧 **Form Handling**: React Hook Form + Zod validation
- 🌐 **Data Storage**: GitHub repository as data backend
- 🔐 **Authentication**: Credentials-based (username/password) login

## 🛠️ Tech Stack

| Technology          | Version       | Purpose                      |
| ------------------- | ------------- | ---------------------------- |
| **Next.js**         | 15.5.7        | React full-stack framework   |
| **React**           | 18.2.0        | User interface library       |
| **TypeScript**      | 5.1.6         | Type-safe JavaScript         |
| **Tailwind CSS**    | 4.1.12        | Atomic CSS framework         |
| **NextAuth.js**     | 5.0.0-beta.25 | Authentication solution      |
| **Radix UI**        | Latest        | Accessible UI component lib  |
| **Lucide React**    | 0.462.0       | Modern icon library          |
| **React Query**     | 5.62.2        | Data fetching & state mgmt   |
| **React Hook Form** | 7.53.2        | Form handling                |
| **Zod**             | 3.25.76       | Data validation              |
| **Monaco Editor**   | 0.52.2        | Code editor                  |

## 🚀 Quick Start

### Requirements

- Node.js 20.0+
- pnpm 8.0+ (recommended) or npm/yarn
- GitHub account

### Installation

1. **Clone the project**
```bash
git clone https://github.com/tianyaxiang/NavSphere.git
cd NavSphere
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` file and configure the necessary environment variables (see configuration guide below)

4. **Start development server**
```bash
pnpm dev
```

5. **Access the application**
   
   Open your browser and visit [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration Guide

### Environment Variables

Create a `.env.local` file and configure the following variables:

```env
# Admin Credentials (format: username:password, comma separated for multiple)
ADMIN_USERS=admin:your-password

# GitHub Repository Configuration
GITHUB_OWNER=your-github-username
GITHUB_REPO=your-data-repo-name
GITHUB_BRANCH=main

# GitHub Fine-grained PAT (for reading/writing repo data)
GITHUB_PAT=your-github-personal-access-token

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=your-random-auth-secret
AUTH_TRUST_HOST=true
```

### GitHub Token Setup

1. Visit [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Click **Generate new token** → **Fine-grained token**
3. Set repository access to **Only select repositories** and choose your data repo
4. Set permissions: **Contents: Read and Write**
5. Generate and copy the token

### GitHub Data Repository Setup

1. Create a repository on GitHub (e.g., `navsphere-data`)
2. The app will automatically create data files (`videos.json`, `navigation.json`, `site.json`) on first write

## 📊 Data Structure

### videos.json - Video Data Format

```json
{
  "navigationItems": [
    {
      "id": "category-id",
      "title": "Category Name",
      "icon": "Home",
      "description": "Category Description",
      "enabled": true,
      "items": [
        {
          "id": "video-id",
          "title": "Video Title",
          "href": "Video Link",
          "description": "Video Description",
          "icon": "/assets/cover/cover.jpg",
          "enabled": true,
          "videoConfig": {
            "type": "bilibili",
            "bvid": "BV1xxxxxxxxx",
            "aid": "xxx",
            "cid": "xxx",
            "p": 1
          }
        }
      ],
      "subCategories": [...]
    }
  ]
}
```

### navigation.json - Website Navigation Data

```json
{
  "navigationItems": [
    {
      "id": "category-id",
      "title": "Recommended",
      "icon": "Star",
      "description": "Common websites and tools",
      "enabled": true,
      "items": [
        {
          "id": "item-id",
          "title": "Website Name",
          "href": "https://example.com",
          "description": "Website Description",
          "icon": "/assets/images/logos/example.webp",
          "enabled": true
        }
      ],
      "subCategories": [...]
    }
  ]
}
```

## 🚀 Deployment (Cloudflare Workers)

### 1. Prerequisites

- Fork this repo to your GitHub account
- [Cloudflare](https://dash.cloudflare.com/) account
- A GitHub **Fine-grained PAT** with `Contents: Read/Write` on your data repo

### 2. Create Cloudflare API Token

- Cloudflare Dashboard → **My Profile** → **API Tokens** → **Create Token**
- Use **Edit Cloudflare Workers** template
- Select your account
- Save the token

### 3. Set GitHub Secrets

Go to your forked repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
|--------|-------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare Account ID |
| `GITHUB_PAT` | Your GitHub Fine-grained PAT |
| `GITHUB_OWNER` | Your GitHub username |
| `GITHUB_REPO` | Your data repository name |
| `GITHUB_BRANCH` | `main` |
| `ADMIN_USERS` | `user1:pass1,user2:pass2` |
| `AUTH_SECRET` | Random string (`openssl rand -base64 32`) |

### 4. Deploy

Push to `main` branch — GitHub Actions will automatically build and deploy to:
`https://navsphere.<your-subdomain>.workers.dev`

### 5. Custom Domain (Optional)

- Workers → navsphere → Triggers → Custom Domain
- Update `NEXTAUTH_URL` env var in Workers dashboard
- Add your domain to `next.config.js` `allowedOrigins` if needed

## 🔧 Development Guide

### Available Scripts

```bash
pnpm dev          # Development mode
pnpm build        # Build project
pnpm start        # Start production server
pnpm lint         # Code linting
pnpm clean        # Clean build files
```

### Project Structure

```
NavSphere/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── admin/             # Admin dashboard
│   │   └── components/        # Page components
│   ├── components/            # Shared UI components
│   ├── lib/                   # Utility functions
│   ├── types/                 # TypeScript type definitions
│   └── services/              # Service layer
├── public/assets/             # Static assets
├── .github/workflows/         # GitHub Actions CI/CD
└── wrangler.toml              # Cloudflare Workers config
```

## 🎯 Usage Guide

### Adding Videos

1. Log in to admin at `/admin/videos`
2. Click "Add Video" and paste a Bilibili or YouTube link
3. The system auto-detects the platform and extracts video info
4. Save

### Adding Websites

1. Log in to admin at `/admin/navigation`
2. Click "Add Website" and enter the URL
3. The system auto-fetches title, description, and favicon
4. Save

### Video Links Supported

**Bilibili:**
- `https://www.bilibili.com/video/BVxxxxxxxxx`
- `https://b23.tv/xxxxxxx`

**YouTube:**
- `https://www.youtube.com/watch?v=xxxxxxxxxxx`
- `https://youtu.be/xxxxxxxxxxx`

## 🐛 Troubleshooting

**Login fails** — Verify `ADMIN_USERS` format is `user:pass,user2:pass2`

**Data not loading** — Check `GITHUB_PAT` has `Contents: Read/Write` on the correct repo

**Build fails** — Ensure Node.js >= 20, try `rm -rf node_modules pnpm-lock.yaml && pnpm install`

## 📄 License

MIT

---

<p align="center">
  <strong>⭐ Star this project if it helps you!</strong>
</p>
