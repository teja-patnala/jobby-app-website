import {AiFillStar} from 'react-icons/ai'

const SimilarJobs = props => {
  const {eachItem} = props
  const {
    companyLogoUrl,
    employmentType,
    location,
    id,
    jobDescription,
    rating,
    title,
  } = eachItem
  return (
    <li key={id} className="jobItem-container1">
      <div className="header-card">
        <img
          alt="similar job company logo"
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
      <h1 className="title-heading">Description</h1>
      <p className="mid-para">{jobDescription}</p>
      <p className="mid-para">{location}</p>
      <p className="mid-para">{employmentType}</p>
    </li>
  )
}
export default SimilarJobs
