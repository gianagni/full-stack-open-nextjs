import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { getUserByUsername } from "@/app/services/users"
import { getReadingList } from "@/app/services/reading-lists"
import { generateToken } from "@/app/actions/auth"
import { markBlogAsRead } from "@/app/actions/reading-lists"

export default async function MePage() {
  const session = await auth()
  if (!session?.user?.username) {
    redirect("/login")
  }
  const user = await getUserByUsername(session.user.username)
  if (!user) {
    redirect("/login")
  }
  const readingList = await getReadingList(user.id)
  const unread = readingList.filter((entry) => !entry.read)
  const read = readingList.filter((entry) => entry.read)
  return (
    <div data-testid="user-profile">
      <h1>My profile</h1>
      <p data-testid="user-name">{user.name}</p>
      <p data-testid="user-username">{user.username}</p>
      <section data-testid="reading-list-section">
        <h2>Reading list</h2>
        {readingList.length === 0 ? (
          <p data-testid="empty-reading-list">Your reading list is empty</p>
        ) : (
          <ul>
            {readingList.map((entry) => (
              <li key={entry.id}>
                <Link href={`/blogs/${entry.blogId}`}>{entry.title}</Link>
                {entry.read ? " (read)" : " (unread)"}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section data-testid="unread-section">
        <h2>Unread blogs</h2>
        {unread.length === 0 ? (
          <p data-testid="no-unread-blogs">No unread blogs</p>
        ) : (
          <ul>
            {unread.map((entry) => (
              <li key={entry.id}>
                <span>{entry.title}</span>
                <form action={markBlogAsRead}>
                  <input type="hidden" name="blogId" value={entry.blogId} />
                  <button
                    type="submit"
                    data-testid={`mark-read-${entry.blogId}`}
                  >
                    Mark as read
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section data-testid="read-section">
        <h2>Read blogs</h2>
        {read.length === 0 ? (
          <p data-testid="no-read-blogs">No read blogs yet</p>
        ) : (
          <ul>
            {read.map((entry) => (
              <li key={entry.id}>
                <Link href={`/blogs/${entry.blogId}`}>{entry.title}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <section data-testid="api-token-section">
        <h2>API token</h2>
        {user.apiToken ? (
          <div data-testid="token-display">
            <code data-testid="api-token">{user.apiToken}</code>
          </div>
        ) : (
          <p data-testid="no-token-message">
            You have not generated an API token yet
          </p>
        )}
        <form action={generateToken}>
          <button type="submit" data-testid="generate-token-button">
            Generate token
          </button>
        </form>
      </section>
    </div>
  )
}
