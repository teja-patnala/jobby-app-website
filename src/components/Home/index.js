import './index.css'
import {withRouter, Link} from 'react-router-dom'
import Header from '../Header'

const Home = props => {
  const goToJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <div className="container1">
      <Header />
      <div className="container3">
        <div>
          <h1 className="main-heading">Find The Job That Fits Your Life</h1>
          <p className="main-para">
            Millions of people are searching for jobs, salary Information
            ,company reviews. Find the jobs that fits your abilities and
            potential
          </p>
          <Link to="/jobs">
            <button onClick={goToJobs} className="bt1" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default withRouter(Home)
