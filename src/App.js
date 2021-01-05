import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const BlogForm = ({ setNotification, setBlogs }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const createBlogHandler = async (event) => {
    event.preventDefault()

    const blogToCreate = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }

    try {
      await blogService.createBlog(blogToCreate)
      setNotification(`Created blog: ${blogToCreate.title} by ${blogToCreate.author}`)
    } catch (exception) {
      setNotification('Error Creating Blog!')
    } finally {
      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')

      setTimeout(() => {
        setNotification(null)
      }, 5000)

      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
  }

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
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  let msgColor = null
  if (['Added', 'Deleted', 'Updated', 'Created blog', 'Logged In'].includes(message.split(':')[0])) {
    msgColor = 'green'
  }
  else {
    msgColor = 'red'
  }
  
  const notifStyle = {
    color: msgColor,
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return (
    <div style={notifStyle}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState(null)
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

  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const loggedUser =  await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)

      setUser(loggedUser)
      setUsername('')
      setPassword('')

      setNotification(`Logged In: Hello ${loggedUser.name}!`)
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {
      setUsername('')
      setPassword('')

      setNotification('Incorrect Credentials.')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedBlogUser')
    window.location.reload()
  }

  const loginView = () => {
    return (
      <div>
        <h1>Log in here:</h1>
        <LoginForm
          loginHandler={loginHandler}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    )
  }

  const blogView = () => {
    return (
      <div>
        <h2>Blogs</h2>
        {user.name} logged in. 
        <button type="button" onClick={logoutHandler}>Log Out</button>
        <h2>Create a New Blog:</h2>
        <BlogForm 
          user={user}
          newBlog={newBlog}
          setNewBlog={setNewBlog}
          setNotification={setNotification} 
          setBlogs = {setBlogs}
        />
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