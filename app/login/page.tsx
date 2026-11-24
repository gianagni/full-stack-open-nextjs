"use client"

import { useActionState } from "react"
import { loginUser } from "@/app/actions/auth"

export default function LoginPage() {
  const [state, formAction] = useActionState(loginUser, {})
  return (
    <div>
      <h1>Login</h1>
      <form action={formAction}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>
        {state.error && <p data-testid="error-message">{state.error}</p>}
        <button type="submit" data-testid="login-button">
          Login
        </button>
      </form>
    </div>
  )
}
