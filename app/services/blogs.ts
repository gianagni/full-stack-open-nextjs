import { eq, ilike, or } from "drizzle-orm"
import { db } from "@/db"
import { blogs } from "@/db/schema"
import type { Blog } from "@/db/schema"

export type { Blog }

export async function getBlogs(filter?: string): Promise<Blog[]> {
  if (filter) {
    const pattern = `%${filter}%`
    return db
      .select()
      .from(blogs)
      .where(or(ilike(blogs.title, pattern), ilike(blogs.author, pattern)))
  }
  return db.select().from(blogs)
}

export async function getBlogById(id: number) {
  const [blog] = await db.select().from(blogs).where(eq(blogs.id, id))
  return blog ?? null
}

export async function addBlog(blog: {
  title: string
  author: string
  url: string
  userId?: number | null
}) {
  const [created] = await db
    .insert(blogs)
    .values({ ...blog, likes: 0 })
    .returning()
  return created
}

export async function likeBlog(id: number) {
  const blog = await getBlogById(id)
  if (!blog) return null
  const [updated] = await db
    .update(blogs)
    .set({ likes: blog.likes + 1 })
    .where(eq(blogs.id, id))
    .returning()
  return updated
}
