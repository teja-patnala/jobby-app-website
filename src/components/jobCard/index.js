import './index.css'
import NoJobsView from '../NoJobsView'
import JobCardItem from '../JobCardItem'

const JobCard = props => {
  const {jobs, getAllTheData} = props
  const len = jobs.length !== 0
  return len ? (
    <ul>
      {jobs.map(eachItem => (
        <JobCardItem key={eachItem.id} eachItem={eachItem} />
      ))}
    </ul>
  ) : (
    <NoJobsView getAllTheData={getAllTheData} />
  )
}
export default JobCard
