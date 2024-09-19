import React, {useState} from 'react'
import './index.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const formHandling = event => {
    event.preventDefault()
    let valid = true

    // Reset errors
    setEmailError('')
    setPasswordError('')

    if (!email) {
      setEmailError('Please provide a username or email')
      valid = false
    }

    if (!password) {
      setPasswordError('Please provide a password')
      valid = false
    }

    if (valid) {
      console.log('Form handling')
      console.log('User:', email)
      console.log('UserPassword:', password)
    }
  }

  return (
    <div className="login-main-container">
      <div className="login-left-container">
        <img
          src={`${process.env.PUBLIC_URL}/img/instra-login.png`}
          alt="logo-img"
        />
      </div>
      <div className="login-right-container">
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="logo" />
        </div>
        <h1>Insta Share</h1>
        <div>
          <form className="form-container" onSubmit={formHandling}>
            <div className="email-container">
              <label className="label-inputs" htmlFor="email">
                USERNAME / EMAIL
              </label>
              <input
                type="text"
                id="email"
                autoComplete="username"
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
              {emailError && <div className="error-div">{emailError}</div>}
            </div>
            <div className="password-container">
              <label className="label-inputs" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={event => setPassword(event.target.value)}
              />
              {passwordError && (
                <div className="error-div">{passwordError}</div>
              )}
            </div>
            <div className="submit-container">
              <input type="submit" id="button" value="Submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
