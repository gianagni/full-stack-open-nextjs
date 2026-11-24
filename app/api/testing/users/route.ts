import { NextResponse } from "next/server"
import { createUser } from "@/app/services/users"

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 }
    )
  }
  const { username, name, password } = await request.json()
  if (!username || !name || !password) {
    return NextResponse.json(
      { error: "username, name and password are required" },
      { status: 400 }
    )
  }
  const user = await createUser(username, name, password)
  return NextResponse.json(
    { id: user.id, username: user.username, name: user.name },
    { status: 201 }
  )
}
