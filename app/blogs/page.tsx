import Link from "next/link"
import { getBlogs } from "@/app/services/blogs"

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  const { filter } = await searchParams
  const blogs = await getBlogs(filter)
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Blogs</h1>
      <form method="get" className="mb-4 flex gap-2">
        <label htmlFor="filter">Filter</label>
        <input className="rounded border border-slate-300 px-2 py-1"
          id="filter"
          name="filter"
          type="text"
          data-testid="filter-input"
          defaultValue={filter ?? ""}
        />
        <button type="submit" data-testid="search-button" className="rounded bg-slate-800 px-3 py-1 text-white">
          Search
        </button>
      </form>
      {filter && (
        <p>
          Showing blogs matching &quot;{filter}&quot;{" "}
          <Link href="/blogs">show all</Link>
        </p>
      )}
      <ul data-testid="blogs-list" className="space-y-2">
        {blogs.map((blog) => (
          <li key={blog.id} className="border-b pb-2">
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
            <span> by {blog.author}</span>
            <span> ({blog.likes} likes)</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
