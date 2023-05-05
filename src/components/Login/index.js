import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: '', loginStatus: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({loginStatus: true, errorMsg})
  }

  submitUserDetails = async event => {
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
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  assignUsernameToState = event => {
    this.setState({username: event.target.value})
  }

  assignPasswordToState = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, loginStatus, errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-card">
          <form onSubmit={this.submitUserDetails}>
            <img
              alt="website logo"
              className="img111"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
            <div>
              <label htmlFor="label1" className="label1">
                USERNAME
              </label>
              <br />
              <input
                value={username}
                onChange={this.assignUsernameToState}
                className="input1"
                id="label1"
              />
            </div>
            <div>
              <label htmlFor="label2" className="label1">
                PASSWORD
              </label>
              <br />
              <input
                value={password}
                type="password"
                onChange={this.assignPasswordToState}
                className="input1"
                id="label2"
              />
            </div>
            <button type="submit" className="btn1">
              Login
            </button>
            {loginStatus && <p>{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
