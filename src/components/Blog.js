import React, { useState } from 'react'
const Blog = ({ blog, likeHandler }) => {
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
    Created By: {blog.user.name}
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

export default Blog
