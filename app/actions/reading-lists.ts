"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import {
  addToReadingList,
  markAsRead,
} from "@/app/services/reading-lists"

export async function addBlogToReadingList(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }
  const blogId = Number(formData.get("blogId"))
  if (Number.isNaN(blogId)) return
  await addToReadingList(Number(session.user.id), blogId)
  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
}

export async function markBlogAsRead(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }
  const blogId = Number(formData.get("blogId"))
  if (Number.isNaN(blogId)) return
  await markAsRead(Number(session.user.id), blogId)
  revalidatePath("/me")
}
