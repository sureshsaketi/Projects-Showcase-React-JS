import './index.css'

const FailureView = props => {
  const {onClickRetry} = props

  return (
    <div className="failure-view-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  )
}

export default FailureView
