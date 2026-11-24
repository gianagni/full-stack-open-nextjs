import { NextResponse } from "next/server"
import { getUserByApiToken } from "@/app/services/users"

export async function GET(request: Request) {
  const authorization = request.headers.get("authorization")
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice(7)
    : null
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const user = await getUserByApiToken(token)
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  return NextResponse.json({
    id: user.id,
    username: user.username,
    name: user.name,
  })
}
