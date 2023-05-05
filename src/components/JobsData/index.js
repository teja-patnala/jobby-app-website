import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import UserProfile from '../UserProfile'
import Header from '../Header'
import JobCard from '../jobCard'
import NotFound from '../NotFound'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobsData extends Component {
  state = {
    status: false,
    search: '',
    jobStatus: false,
    jobs: [],
    jobType: [],
    range: '',
  }

  componentDidMount() {
    this.getAllTheJobs()
  }

  skill = () => {
    const {jobType, search, range} = this.state
    let typeFilter = jobType.join(',')
    if (typeFilter.length === 0) {
      typeFilter = ''
    }
    const url = `https://apis.ccbp.in/jobs?employment_type=${typeFilter}&minimum_package=${range}&search=${search}`
    return url
  }

  getAllTheJobs = async () => {
    const url = this.skill()
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
      const allJobsData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
        location: eachItem.location,
      }))
      this.setState({jobs: allJobsData})
    } else {
      this.setState({jobStatus: true})
    }
    this.setState({status: true})
  }

  getAllTheJobsProfiles = () => {
    const {jobs, jobStatus} = this.state

    return jobStatus ? (
      <NotFound getAllTheJobs={this.getAllTheJobs} />
    ) : (
      <JobCard jobs={jobs} getAllTheJobs={this.getAllTheJobs} />
    )
  }

  loader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  addCheckbox = async event => {
    const {jobType} = this.state
    if (jobType.includes(event.target.value)) {
      const aa = jobType.filter(eachItem => eachItem !== event.target.value)
      await this.setState({jobType: aa})
    } else {
      await this.setState(prevState => ({
        jobType: [...prevState.jobType, event.target.value],
      }))
    }
    this.getAllTheJobs()
  }

  addRadio = async event => {
    await this.setState({range: event.target.value})
    this.getAllTheJobs()
  }

  employmentTypeFilter = eachItem => (
    <li key={eachItem.label}>
      <input
        value={eachItem.employmentTypeId}
        type="checkbox"
        onClick={this.addCheckbox}
      />
      <label className="label-font">{eachItem.label}</label>
    </li>
  )

  salaryFilter = eachItem => (
    <li key={eachItem.label}>
      <input
        onChange={this.addRadio}
        type="radio"
        name="label"
        value={eachItem.salaryRangeId}
      />
      <label className="label-font">{eachItem.label}</label>
    </li>
  )

  addToSearch = event => {
    this.setState({search: event.target.value})
  }

  CallAddToSearch = () => {
    this.getAllTheJobs()
  }

  render() {
    const {status, search} = this.state

    return (
      <div className="job-container1">
        <Header />
        <div className="job-container2">
          <div className="filter-container">
            <div className="profile-container">
              <UserProfile />
            </div>
            <hr className="filter-hr" />
            <h1 className="type-filter">Type of Employment</h1>
            {employmentTypesList.map(eachItem =>
              this.employmentTypeFilter(eachItem),
            )}
            <hr className="filter-hr" />
            <h1 className="type-filter">Salary Range</h1>
            {salaryRangesList.map(eachItem => this.salaryFilter(eachItem))}
          </div>
          <div className="all-jobs-container">
            <div className="input-container1">
              <input
                placeholder="Search"
                type="search"
                value={search}
                className="search-input"
                onChange={this.addToSearch}
              />
              <button
                type="button"
                onClick={this.CallAddToSearch}
                data-testid="searchButton"
              >
                <BsSearch className="img-icon" />
              </button>
            </div>
            <div className="container">
              {status ? this.getAllTheJobsProfiles() : this.loader()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default JobsData
