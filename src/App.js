import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({username, setUsername, password, setPassword, setUser, setNotification}) => {
  const loginHandler = async (event) => {
    event.preventDefault()
    try {
      const loggedUser =  await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogUser', JSON.stringify(loggedUser))
      blogService.setToken(loggedUser.token)

      setUser(loggedUser)
      setUsername('')
      setPassword('')

      setNotification(`Logged In Successfully. Hello ${loggedUser.name}!`)
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
  return (
    <div>
      <form onSubmit={loginHandler} >
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

// const BlogForm = () => {
//   return (
//     <div>
//       <form>
//         <div>

//         </div>
//       </form>
//     </div>
//   )
// }

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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  if (user === null) {
    return (
      <div>
        <Notification message={notification} />
        <h1>Log in here:</h1>
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUser}
          setNotification={setNotification}
        />
      </div>
    ) 
  }

  return (
    <div>
      <Notification message={notification} />
      <h2>blogs</h2>
      <p>{user.name} logged in.</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App