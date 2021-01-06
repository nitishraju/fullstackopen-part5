import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const BlogForm = React.forwardRef(({ createBlogHandler }, ref) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const resetVals = () => {
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const getNewBlog = () => {
    const blogToCreate = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    return blogToCreate
  }

  useImperativeHandle(ref, () => {
    return {
      resetVals,
      getNewBlog
    }
  })

  return (
    <div>
      <form onSubmit={createBlogHandler}>
        <div>
          Title: 
          <input
            type="text"
            value={blogTitle}
            onChange={({target}) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          Author: 
          <input
            type="text"
            value={blogAuthor}
            onChange={({target}) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          URL: 
          <input
            type="text"
            value={blogUrl}
            onChange={({target}) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
})

BlogForm.propTypes = {
  createBlogHandler: PropTypes.func.isRequired
}

export default BlogForm