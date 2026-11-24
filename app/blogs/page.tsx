import Link from "next/link"
import { getBlogs } from "../services/blogs"

const BlogsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams

  const allBlogs = getBlogs()
  const filteredBlogs = filter
    ? allBlogs.filter(
        (blog) =>
          blog.title.toLowerCase().includes(filter.toLowerCase()) ||
          blog.author.toLowerCase().includes(filter.toLowerCase())
      )
    : allBlogs
  const blogs = [...filteredBlogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <form>
        <input
          type="text"
          name="filter"
          defaultValue={filter ?? ""}
          placeholder="Search blogs"
        />{" "}
        <button type="submit">search</button>
      </form>
      {filter && (
        <p>
          Showing blogs matching &quot;{filter}&quot;{" "}
          <Link href="/blogs">show all</Link>
        </p>
      )}
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>{" "}
            ({blog.likes} likes)
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogsPage
