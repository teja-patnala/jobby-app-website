import './index.css'
import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import Cookies from 'js-cookie'
import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import Skill from '../Skill'

class FullJobCard extends Component {
  state = {
    status: true,
    detailsStatus: true,
    jobDataView: {},
  }

  componentDidMount() {
    this.getTheJobDetails()
  }

  getTheJobDetails = async () => {
    const {match} = this.props
    const {params} = match

    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
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
      const jobData = {
        jobDetails: {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          skills: data.job_details.skills.map(e1 => ({
            imageUrl: e1.image_url,
            name: e1.name,
          })),
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
        },
        similarJobs: data.similar_jobs.map(eachItem => ({
          companyLogoUrl: eachItem.company_logo_url,
          employmentType: eachItem.employment_type,
          id: eachItem.data,
          jobDescription: eachItem.job_description,
          location: eachItem.location,
          rating: eachItem.rating,
          title: eachItem.title,
        })),
      }
      this.setState({jobDataView: jobData})
      this.setState({detailsStatus: false})
    }
    this.setState({status: false})
  }

  failureJobs = () => (
    <div className="job-failure-container">
      <img
        alt="failure view"
        className="job-failure"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={this.getTheJobs}>
        Retry
      </button>
    </div>
  )

  getTheBlog = () => {
    const {jobDataView} = this.state
    const {jobDetails, similarJobs} = jobDataView
    const {skills} = jobDetails
    return (
      <div key={jobDetails.id} className="job-details-container1">
        <div className="header-card">
          <img
            alt="job details company logo"
            className="company-profile"
            src={jobDetails.companyLogoUrl}
          />
          <div className="sub-header-card">
            <p className="title-heading">{jobDetails.title}</p>
            <div className="sub-header-card2">
              <AiFillStar className="icon22" />
              <p className="title-heading">{jobDetails.rating}</p>
            </div>
          </div>
        </div>
        <div className="mid-card1">
          <div className="sub-mid-card1">
            <div className="sub-header-card2">
              <GoLocation className="icon22" />
              <p className="mid-para">{jobDetails.location}</p>
            </div>
            <div className="sub-header-card2">
              <BsFillBriefcaseFill className="icon22" />
              <p className="mid-para">{jobDetails.employmentType}</p>
            </div>
          </div>
          <p className="title-heading">{jobDetails.packagePerAnnum}</p>
        </div>
        <hr className="hr223" />
        <h1 className="title-heading">Description</h1>
        <p className="mid-para">{jobDetails.jobDescription}</p>
        <h1 className="title-heading">Skills</h1>
        <div className="skills-container">
          <ul>
            {skills.map(eachItem => (
              <Skill key={eachItem.name} eachItem={eachItem} />
            ))}
          </ul>
        </div>
        <h1 className="title-heading">Life at Company</h1>
        <a className="title-heading" href={jobDetails.companyWebsiteUrl}>
          Visit
        </a>
        <div className="life-card1">
          <p className="mid-para">{jobDetails.lifeAtCompany.description}</p>
          <img
            alt="life at company"
            className="life-image"
            src={jobDetails.lifeAtCompany.imageUrl}
          />
        </div>
        <h1 className="title-heading">Similar Jobs</h1>
        <div className="similar-jobs-container">
          <ul>
            {similarJobs.map(eachItem => (
              <SimilarJobs key={eachItem.id} eachItem={eachItem} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderBlogItemDetails = () => {
    const {detailsStatus} = this.state
    return detailsStatus ? this.failureJobs() : this.getTheBlog()
  }

  render() {
    const {status} = this.state
    return (
      <div className="job-container1">
        <Header />
        {status ? (
          <div data-testid="loader" className="loader">
            <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
          </div>
        ) : (
          this.renderBlogItemDetails()
        )}
      </div>
    )
  }
}
export default FullJobCard
