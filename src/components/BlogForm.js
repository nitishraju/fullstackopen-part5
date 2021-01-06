import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlogHandler }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const resetVals = () => {
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const addBlog = (event) => {
    event.preventDefault()

    const blogToCreate = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    createBlogHandler(blogToCreate)
    resetVals()
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            id="title"
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          URL:
          <input
            id="url"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlogHandler: PropTypes.func.isRequired
}

BlogForm.displayName = 'BlogForm'

export default BlogForm