import { notFound } from "next/navigation"
import { auth } from "@/auth"
import { getBlogById } from "@/app/services/blogs"
import { likeBlog } from "@/app/actions/blogs"
import { addBlogToReadingList } from "@/app/actions/reading-lists"

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const blog = await getBlogById(Number(id))
  if (!blog) notFound()
  const session = await auth()
  return (
    <div data-testid="blog-detail">
      <h1 data-testid="blog-title" className="text-2xl font-bold">{blog.title}</h1>
      <p data-testid="blog-author">{blog.author}</p>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit" className="rounded bg-slate-800 px-3 py-1 text-white">like</button>
      </form>
      {session?.user && (
        <form action={addBlogToReadingList}>
          <input type="hidden" name="blogId" value={blog.id} />
          <button type="submit" data-testid="add-to-reading-list-button" className="rounded bg-slate-800 px-3 py-1 text-white">
            Add to reading list
          </button>
        </form>
      )}
    </div>
  )
}
