import React from 'react'

const LoginForm = ({
  loginHandler,
  username,
  setUsername,
  password,
  setPassword
  }) => {
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
}

export default LoginForm