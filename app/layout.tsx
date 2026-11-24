import type { Metadata } from "next"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "Blog app",
  description: "An example app for Full Stack Open: Next.js course",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <Link href="/">home</Link> | <Link href="/blogs">blogs</Link> |{" "}
          <Link href="/blogs/new">new blog</Link>
        </div>
        {children}
      </body>
    </html>
  )
}
