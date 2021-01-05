import React, { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const existingUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (existingUserJSON) {
      const existingUser = JSON.parse(existingUserJSON)
      setUser(existingUser)
      blogService.setToken(existingUser.token)
    }
  }, [])

  const loginFormRef = useRef()
  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const userToLog = loginFormRef.current.getUser()
      const loggedUser =  await loginService.login(userToLog)

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)

      setUser(loggedUser)
      setNotification(`Logged In: Hello ${loggedUser.name}!`)

    } catch (exception) {
      setNotification('Incorrect Credentials.')
    } finally {
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload()
  }

  const blogFormRef = useRef()
  const createBlogHandler = async (event) => {
    event.preventDefault()

    const blogToCreate = blogFormRef.current.getNewBlog()
    try {
      await blogService.createBlog(blogToCreate)
      setNotification(`Created blog: ${blogToCreate.title} by ${blogToCreate.author}`)
    } catch (exception) {
      setNotification('Error Creating Blog!')
    } finally {
      blogFormRef.current.resetVals()

      setTimeout(() => {
        setNotification(null)
      }, 5000)

      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }

  const loginView = () => {
    return (
      <div>
        <h1>Log in here:</h1>
        <LoginForm
          ref={loginFormRef}
          loginHandler={loginHandler}
        />
      </div>
    )
  }

  const blogToggle = useRef()
  const blogView = () => {
    return (
      <div>
        <h2>Blogs</h2>
        {user.name} logged in. 
        <button type="button" onClick={logoutHandler}>Log Out</button>
        <Toggleable toggleLabel="Create Blog Entry" ref={blogToggle}>
          <h2>Create a New Blog:</h2>
          <BlogForm
            ref={blogFormRef}
            createBlogHandler={createBlogHandler}
          />
        </Toggleable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification} />
      {user === null
        ? loginView()
        : blogView()
      }
    </div>
  )
}

export default App