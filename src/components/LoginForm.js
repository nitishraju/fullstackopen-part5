import React, { useState, useImperativeHandle } from 'react'

const LoginForm = React.forwardRef(({loginHandler}, ref) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const getUser = () => {
    const userToLog = {
      username,
      password
    }
    return userToLog
  }

  useImperativeHandle(ref, () => {
    return ({
      getUser
    })
  })

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
            type="password"
            value={password}
            name="password"
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )
})

export default LoginForm