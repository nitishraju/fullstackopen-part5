import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, likeHandler, deleteHandler }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonText = expanded ? 'hide' : 'show'

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const showDelete = () => user.username === blog.user.username
    ? <><button type="button" onClick={() => deleteHandler(blog)}>Remove</button></>
    : null

  const hiddenView = () => (
    <>
      {blog.title} - {blog.author}
      <button type="button" onClick={toggleExpanded}>{buttonText}</button>
    </>
  )

  const expandedView = () => (
    <>
      {blog.title} - {blog.author}
      <button type="button" onClick={toggleExpanded}>{buttonText}</button><br />
      URL: {blog.url}<br />
      Likes: {blog.likes}
      <button type="buton" onClick={() => likeHandler(blog)}>like</button><br />
      Created By: {blog.user.name}<br />
      {showDelete()}
    </>
  )

  return (
    <div style={blogStyle}>
      {expanded
        ? expandedView()
        : hiddenView()
      }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  likeHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired
}

export default Blog
