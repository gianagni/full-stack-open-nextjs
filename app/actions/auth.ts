"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { AuthError } from "next-auth"
import bcrypt from "bcryptjs"
import { randomBytes } from "crypto"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { auth, signIn } from "@/auth"
import { db } from "@/db"
import { users } from "@/db/schema"
import { createUser, getUserByUsername } from "@/app/services/users"

export type RegisterState = {
  usernameError?: string
  passwordError?: string
  passwordConfirmError?: string
}

export async function registerUser(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const username = String(formData.get("username") ?? "").trim()
  const name = String(formData.get("name") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const passwordConfirm = String(formData.get("passwordConfirm") ?? "")

  if (username.length < 4) {
    return { usernameError: "Username must be at least 4 characters long" }
  }
  if (password.length < 4) {
    return { passwordError: "Password must be at least 4 characters long" }
  }
  if (password !== passwordConfirm) {
    return { passwordConfirmError: "Passwords do not match" }
  }
  const existing = await getUserByUsername(username)
  if (existing) {
    return { usernameError: "Username is already taken" }
  }
  await createUser(username, name, password)
  redirect("/login")
}

export type LoginState = {
  error?: string
}

export async function loginUser(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "")
  const password = String(formData.get("password") ?? "")
  const user = await getUserByUsername(username)
  if (!user) {
    return { error: "Invalid username or password" }
  }
  const passwordCorrect = await bcrypt.compare(password, user.passwordHash)
  if (!passwordCorrect) {
    return { error: "Invalid username or password" }
  }
  try {
    const cookieStore = await cookies()
    cookieStore.set("notification", "Logged in successfully", {
      path: "/",
      maxAge: 60,
    })
    await signIn("credentials", { username, password, redirectTo: "/" })
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid username or password" }
    }
    throw error
  }
  return {}
}

export async function generateToken() {
  const session = await auth()
  if (!session?.user?.id) {
    redirect("/login")
  }
  const token = randomBytes(32).toString("hex")
  await db
    .update(users)
    .set({ apiToken: token })
    .where(eq(users.id, Number(session.user.id)))
  revalidatePath("/me")
}
