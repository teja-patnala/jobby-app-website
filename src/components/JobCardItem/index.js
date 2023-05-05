import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const JobCardItem = props => {
  const {eachItem} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = eachItem
  return (
    <li key={id} className="jobItem-container">
      <Link to={`/jobs/${id}`}>
        <div className="header-card">
          <img
            alt="job details company logo"
            className="company-profile"
            src={companyLogoUrl}
          />
          <div className="sub-header-card">
            <h1 className="title-heading">{title}</h1>
            <div className="sub-header-card2">
              <AiFillStar className="icon22" />
              <p className="title-heading">{rating}</p>
            </div>
          </div>
        </div>
        <div className="mid-card">
          <div className="sub-mid-card1">
            <div className="sub-header-card2">
              <GoLocation className="icon22" />
              <p className="mid-para">{location}</p>
            </div>
            <div className="sub-header-card2">
              <BsFillBriefcaseFill className="icon22" />
              <p className="mid-para">{employmentType}</p>
            </div>
          </div>
          <p className="title-heading">{packagePerAnnum}</p>
        </div>
        <hr className="hr2" />
        <h1 className="title-heading">Description</h1>
        <p className="mid-para">{jobDescription}</p>
      </Link>
    </li>
  )
}
export default JobCardItem
