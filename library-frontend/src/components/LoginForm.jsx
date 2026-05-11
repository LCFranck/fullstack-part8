import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const [login] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
      props.setPage("authors")
    },
    onError: (error) => {
      console.log("error logging in", error)
      setError(true)

      setTimeout(() => {
        setError(false)
      }, 5000)
    }
  })

  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            id='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input 
            id='password'
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      {error && <p>Login failed</p>}
    </div>
  )
}





export default LoginForm