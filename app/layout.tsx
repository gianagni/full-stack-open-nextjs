import type { Metadata } from "next"
import "./globals.css"
import NavBar from "@/app/components/NavBar"
import Notification from "@/app/components/Notification"

export const metadata: Metadata = {
  title: "Blog app",
  description: "Blog application built with Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <Notification />
        <main>{children}</main>
      </body>
    </html>
  )
}
