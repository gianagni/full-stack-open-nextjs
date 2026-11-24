import { and, eq } from "drizzle-orm"
import { db } from "@/db"
import { blogs, readingLists } from "@/db/schema"

export async function getReadingList(userId: number) {
  return db
    .select({
      id: readingLists.id,
      blogId: readingLists.blogId,
      read: readingLists.read,
      title: blogs.title,
      author: blogs.author,
      url: blogs.url,
      likes: blogs.likes,
    })
    .from(readingLists)
    .innerJoin(blogs, eq(readingLists.blogId, blogs.id))
    .where(eq(readingLists.userId, userId))
}

export async function addToReadingList(userId: number, blogId: number) {
  const existing = await db
    .select()
    .from(readingLists)
    .where(
      and(eq(readingLists.userId, userId), eq(readingLists.blogId, blogId))
    )
  if (existing.length > 0) return existing[0]
  const [created] = await db
    .insert(readingLists)
    .values({ userId, blogId })
    .returning()
  return created
}

export async function markAsRead(userId: number, blogId: number) {
  const [updated] = await db
    .update(readingLists)
    .set({ read: true })
    .where(
      and(eq(readingLists.userId, userId), eq(readingLists.blogId, blogId))
    )
    .returning()
  return updated ?? null
}
