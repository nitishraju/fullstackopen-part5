import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const LoginForm = React.forwardRef(({ loginHandler }, ref) => {
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
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type="password"
            value={password}
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">Log In</button>
      </form>
    </div>
  )
})

LoginForm.propTypes = {
  loginHandler: PropTypes.func.isRequired
}

LoginForm.displayName = 'LoginForm'

export default LoginForm