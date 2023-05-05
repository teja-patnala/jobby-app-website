const NoJobsView = props => {
  const {getAllTheData} = props
  const callFunction1 = () => {
    getAllTheData()
  }
  return (
    <div className="notfound-container">
      <img
        alt="no jobs"
        className="img22"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1 className="h1">No Jobs Found</h1>
      <p>We could not find any jobs. Try other filters</p>
      <button onClick={callFunction1} type="button" className="retry-button">
        Retry
      </button>
    </div>
  )
}
export default NoJobsView
