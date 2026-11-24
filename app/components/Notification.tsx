"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export default function Notification() {
  const [message, setMessage] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const match = document.cookie.match(/(?:^| )notification=([^;]*)/)
    if (match) {
      setMessage(decodeURIComponent(match[1]))
      document.cookie = "notification=; Max-Age=0; path=/"
    } else {
      setMessage(null)
    }
  }, [pathname])

  if (!message) return null

  return (
    <div data-testid="notification" role="status">
      {message}
    </div>
  )
}
