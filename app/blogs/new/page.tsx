"use client"

import { useActionState } from "react"
import { createBlog } from "@/app/actions/blogs"

export default function NewBlogPage() {
  const [state, formAction] = useActionState(createBlog, {})
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Create a new blog</h1>
      <form action={formAction}>
        <div>
          <label htmlFor="title">Title</label>
          <input className="w-full rounded border border-slate-300 px-2 py-1"
            id="title"
            name="title"
            type="text"
            required
            defaultValue={state.title ?? ""}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input className="w-full rounded border border-slate-300 px-2 py-1"
            id="author"
            name="author"
            type="text"
            required
            defaultValue={state.author ?? ""}
          />
        </div>
        <div>
          <label htmlFor="url">URL</label>
          <input className="w-full rounded border border-slate-300 px-2 py-1"
            id="url"
            name="url"
            type="text"
            required
            defaultValue={state.url ?? ""}
          />
        </div>
        {state.error && <p>{state.error}</p>}
        <button type="submit" data-testid="create-blog-button" className="rounded bg-slate-800 px-3 py-1 text-white">
          Create
        </button>
      </form>
    </div>
  )
}
