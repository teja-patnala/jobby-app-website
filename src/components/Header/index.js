import './index.css'
import {Link, WithRouter} from 'react-router-dom'
import {Cookies} from 'js-cookie'

const Header = props => {
  const {history} = props
  const logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const goToHome = () => {
    history.replace('/')
  }
  return (
    <div className="home-navbar">
      <img
        alt="website logo"
        className="img2"
        onClick={goToHome}
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      />

      <div>
        <ul>
          <li>
            <Link className="link1" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link1" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
      </div>
      <button type="button" onClick={logout} className="btn2">
        Logout
      </button>
    </div>
  )
}
export default WithRouter(Header)
