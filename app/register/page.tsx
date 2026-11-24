"use client"

import { useActionState } from "react"
import { registerUser } from "@/app/actions/auth"

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {})
  return (
    <div>
      <h1>Register</h1>
      <form action={formAction}>
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" name="username" type="text" required />
          {state.usernameError && (
            <p data-testid="username-error">{state.usernameError}</p>
          )}
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
          {state.passwordError && (
            <p data-testid="password-error">{state.passwordError}</p>
          )}
        </div>
        <div>
          <label htmlFor="passwordConfirm">Confirm Password</label>
          <input
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            required
          />
          {state.passwordConfirmError && (
            <p data-testid="passwordConfirm-error">
              {state.passwordConfirmError}
            </p>
          )}
        </div>
        <button type="submit" data-testid="register-button">
          Register
        </button>
      </form>
    </div>
  )
}
