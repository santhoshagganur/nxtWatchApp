import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import {LoginContainer} from './styledComponents'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  renderSuccessView = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  renderFailureView = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  submitUserCredentials = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(response.ok)

    if (response.ok === true) {
      this.renderSuccessView(data.jwt_token)
    } else {
      this.renderFailureView(data.error_msg)
    }
  }

  render() {
    const {showErrorMsg, errorMsg, username, password} = this.state

    return (
      <LoginContainer className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="login-website-logo"
          />
          <form className="form-element" onSubmit={this.submitUserCredentials}>
            <label htmlFor="username" className="label-element">
              USERNAME
            </label>
            <input
              type="text"
              className="input-element"
              id="username"
              placeholder="Username"
              onChange={this.changeUsername}
              value={username}
            />
            <label htmlFor="password" className="label-element">
              PASSWORD
            </label>
            <input
              type="text"
              className="input-element"
              id="password"
              placeholder="Password"
              onChange={this.changePassword}
              value={password}
            />
            <div className="show-password-container">
              <input type="checkbox" />
              <p className="show-password-text"> Show Password </p>
            </div>
            <button type="button" className="login-button">
              Login
            </button>
            {showErrorMsg ? <p className="error-msg"> {errorMsg} </p> : null}
          </form>
        </div>
      </LoginContainer>
    )
  }
}

export default Login
