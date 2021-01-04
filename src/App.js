import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({setUser, setNotification}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (event) => {
    event.preventDefault()
    try {
      const loggedUser =  await loginService.getUser({ username, password })
      setUser(loggedUser)
      setUsername('')
      setPassword('')

      setNotification(`Logged In Successfully. Hello ${loggedUser.name}`)
    } catch (exception) {
      setUsername('')
      setPassword('')
      setNotification('Incorrect Credentials.')
    }

  }
  return (
    <div>
      <h1>Log in here!</h1>
      <form onSubmit={submitHandler} >
        <div>
          Username: 
            <input 
              type="text"
              value={username}
              name="username"
              onChange={({target}) => setUsername(target.value)}
            />
        </div>
        <div>
          Password: 
          <input 
            type="text"
            value={password}
            name="password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }, [notification])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <Notification message={notification} />
      <LoginForm setUser={setUser} setNotification={setNotification} />
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App