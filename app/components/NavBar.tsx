import Link from "next/link"
import { auth, signOut } from "@/auth"

export default async function NavBar() {
  const session = await auth()
  return (
    <nav className="flex flex-wrap items-center gap-4 bg-slate-800 px-4 py-3 text-white">
      <Link className="hover:underline" href="/">home</Link>
      <Link className="hover:underline" href="/blogs">blogs</Link>
      <Link className="hover:underline" href="/blogs/new">new blogs</Link>
      <Link className="hover:underline" href="/users">users</Link>
      {session?.user ? (
        <>
          <Link className="hover:underline" href="/me">me</Link>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/" })
            }}
          >
            <button type="submit" className="hover:underline">logout</button>
          </form>
        </>
      ) : (
        <>
          <Link className="hover:underline" href="/login">login</Link>
          <Link className="hover:underline" href="/register">register</Link>
        </>
      )}
    </nav>
  )
}
