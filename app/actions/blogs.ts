"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { auth } from "@/auth"
import {
  addBlog as addBlogToDb,
  likeBlog as likeBlogInDb,
} from "@/app/services/blogs"

export type CreateBlogState = {
  error?: string
  title?: string
  author?: string
  url?: string
}

export async function createBlog(
  _prevState: CreateBlogState,
  formData: FormData
): Promise<CreateBlogState> {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }
  const title = String(formData.get("title") ?? "").trim()
  const author = String(formData.get("author") ?? "").trim()
  const url = String(formData.get("url") ?? "").trim()
  if (!title || title.length < 5) {
    return {
      error: "Title must be at least 5 characters long",
      title,
      author,
      url,
    }
  }
  if (!author || author.length < 5) {
    return {
      error: "Author must be at least 5 characters long",
      title,
      author,
      url,
    }
  }
  if (!url || url.length < 5) {
    return {
      error: "URL must be at least 5 characters long",
      title,
      author,
      url,
    }
  }
  await addBlogToDb({ title, author, url, userId: Number(session.user.id) })
  const cookieStore = await cookies()
  cookieStore.set("notification", "Blog created successfully", {
    path: "/",
    maxAge: 60,
  })
  revalidatePath("/blogs")
  redirect("/blogs")
}

export async function likeBlog(formData: FormData) {
  const id = Number(formData.get("id"))
  if (Number.isNaN(id)) return
  await likeBlogInDb(id)
  revalidatePath("/blogs")
  revalidatePath(`/blogs/${id}`)
}
