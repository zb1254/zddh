# NavSphere - 内容导航管理平台

<p align="center">
  <strong>视频导航 + 网址导航</strong>
</p>

## 快速部署（Cloudflare Workers）

### 1. Fork 仓库

Fork 本项目到你自己的 GitHub 账号下。

### 2. Cloudflare 创建 Workers 项目

- 打开 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Workers & Pages
- 点 **Create** → **Workers** → 项目名填 `navsphere`
- 创建完成后，记下右侧的 **Account ID**

### 3. 创建 GitHub Token

- 打开 https://github.com/settings/tokens → **Fine-grained tokens**
- 权限：你的数据仓库（`Contents: Read/Write`）
- 生成后复制 token 值

### 4. 配置 GitHub Secrets

去 GitHub 仓库 → **Settings → Secrets and variables → Actions → New repository secret**：

| Secret | 说明 |
|--------|------|
| `CLOUDFLARE_API_TOKEN` | Cloudflare API Token（权限：Cloudflare Workers → Edit） |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare Dashboard 右侧的 Account ID |
| `GITHUB_PAT` | 上一步创建的 GitHub Token |
| `GITHUB_OWNER` | 你的 GitHub 用户名 |
| `GITHUB_REPO` | 存放数据的仓库名 |
| `GITHUB_BRANCH` | `main` |
| `ADMIN_USERS` | 管理员账号密码，格式 `用户名:密码`，多个用逗号分隔 |
| `AUTH_SECRET` | 任意随机字符串（`openssl rand -base64 32`） |

### 5. 推送部署

推送到 `main` 分支，GitHub Actions 自动部署到 `https://navsphere.你的子域.workers.dev`。

### 6. 绑定自定义域名（可选）

Workers → navsphere → Triggers → Custom Domains → 添加你的域名。

同时更新 Workers 环境变量：
- `NEXTAUTH_URL` → `https://你的域名`
- 如果用了 Server Actions，在 `next.config.js` 的 `allowedOrigins` 加上你的域名

## 环境变量（Cloudflare Workers → Settings → Variables）

| 变量 | 必填 | 说明 |
|------|------|------|
| `AUTH_SECRET` | 是 | NextAuth 加密密钥 |
| `ADMIN_USERS` | 是 | 管理员账号 `user1:pass1,user2:pass2` |
| `GITHUB_PAT` | 是 | 用于读写仓库数据的 Token |
| `GITHUB_OWNER` | 是 | GitHub 用户名 |
| `GITHUB_REPO` | 是 | 数据仓库名 |
| `GITHUB_BRANCH` | 否 | 默认 `main` |
| `NEXTAUTH_URL` | 否 | 自动检测，自定义域名时建议设置 |
| `AUTH_TRUST_HOST` | 否 | Workers 上建议设为 `true` |

## 本地开发

```bash
pnpm install
cp .env.example .env.local
# 编辑 .env.local 填入配置
pnpm dev
```

## LICENSE

MIT
