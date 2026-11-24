import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { db } from "@/db"
import { users } from "@/db/schema"

export async function getUserByUsername(username: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
  return user ?? null
}

export async function getUsers() {
  return db.select().from(users)
}

export async function createUser(
  username: string,
  name: string,
  password: string
) {
  const passwordHash = await bcrypt.hash(password, 10)
  const [user] = await db
    .insert(users)
    .values({ username, name, passwordHash })
    .returning()
  return user
}

export async function getUserByApiToken(apiToken: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.apiToken, apiToken))
  return user ?? null
}

export async function getUserWithBlogs(username: string) {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  })
}
