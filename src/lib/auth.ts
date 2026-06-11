import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from './db'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        try {
          const [rows] = await db.query(
            'SELECT * FROM users WHERE email = ? LIMIT 1',
            [credentials.email]
          )
          const users = rows as any[]
          if (!users.length) return null
          const user = users[0]
          const valid = await bcrypt.compare(credentials.password, user.password)
          if (!valid) return null
          return { id: String(user.id), name: user.name, email: user.email, role: user.role }
        } catch {
          return null
        }
      },
    }),
  ],
  pages: { signIn: '/admin/login' },
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role
        ;(session.user as any).id = token.sub
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'spotrz-secret',
}
