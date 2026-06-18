import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import type { DefaultSession, NextAuthConfig } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken?: string
    } & DefaultSession['user']
  }
  interface JWT {
    accessToken?: string
  }
  interface User {
    accessToken?: string
  }
}

const config = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: '用户名', type: 'text' },
        password: { label: '密码', type: 'password' }
      },
      async authorize(credentials) {
        const adminUsers = process.env.ADMIN_USERS?.split(',').map(s => s.trim()).filter(Boolean) || []
        if (adminUsers.length === 0) return null
        for (const entry of adminUsers) {
          const [username, password] = entry.split(':')
          if (username === credentials?.username && password === credentials?.password) {
            return {
              id: username,
              name: username,
              accessToken: process.env.GITHUB_PAT || ''
            }
          }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.accessToken = token.accessToken as string
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin'
  },
  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig

const handler = NextAuth(config)

export const auth = handler.auth
export const { handlers: { GET, POST } } = handler
