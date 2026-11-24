import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { eq } from "drizzle-orm"
import { db } from "@/db"
import { users } from "@/db/schema"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username
        const password = credentials?.password
        if (typeof username !== "string" || typeof password !== "string") {
          return null
        }
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.username, username))
        if (!user) return null
        const passwordCorrect = await bcrypt.compare(
          password,
          user.passwordHash
        )
        if (!passwordCorrect) return null
        return { id: String(user.id), name: user.name, username: user.username }
      },
    }),
  ],
})
