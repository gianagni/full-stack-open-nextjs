import { createBlog } from "../../actions/blogs"

const NewBlogPage = () => {
  return (
    <div>
      <h2>create new blog</h2>
      <form action={createBlog}>
        <div>
          <label htmlFor="title">title</label>
          <input id="title" type="text" name="title" required />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input id="author" type="text" name="author" required />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input id="url" type="text" name="url" required />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogPage
