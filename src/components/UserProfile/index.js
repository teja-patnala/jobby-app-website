import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

class UserProfile extends Component {
  state = {status: false, userData: [], userStatus: false}

  componentDidMount() {
    this.getTheProfileData()
  }

  getTheProfileData = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const profile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({userData: profile})
    } else {
      this.setState({userStatus: true})
    }
    this.setState({status: true})
  }

  loader = () => (
    <div className="loader-container1">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  userBio = () => {
    const {userData} = this.state
    const {name, profileImageUrl, shortBio} = userData
    return (
      <div className="user-profile1">
        <img alt="profile" className="profile-img" src={profileImageUrl} />
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-para1">{shortBio}</p>
      </div>
    )
  }

  failure = () => (
    <div className="container-failure">
      <button
        onClick={this.getTheProfileData}
        type="button"
        className="retry-button"
      >
        Retry
      </button>
    </div>
  )

  profileContainer = () => {
    const {userStatus} = this.state
    return userStatus ? this.failure() : this.userBio()
  }

  render() {
    const {status} = this.state
    return status ? this.profileContainer() : this.loader()
  }
}

export default UserProfile
