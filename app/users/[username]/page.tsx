import Link from "next/link"
import { notFound } from "next/navigation"
import { getUserWithBlogs } from "@/app/services/users"
import { getReadingList } from "@/app/services/reading-lists"

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const user = await getUserWithBlogs(username)
  if (!user) notFound()
  const readingList = await getReadingList(user.id)
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.username}</p>
      <h2>Blogs</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      <h2>Reading list</h2>
      <ul>
        {readingList.map((entry) => (
          <li key={entry.id}>
            <Link href={`/blogs/${entry.blogId}`}>{entry.title}</Link>
            {entry.read ? " (read)" : " (unread)"}
          </li>
        ))}
      </ul>
    </div>
  )
}
