import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import FailureView from '../FailureView'

import './index.css'

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    category: categoriesList[0].id,
    projectsList: [],
  }

  componentDidMount() {
    this.getProjectsList()
  }

  getProjectsList = async () => {
    const {category} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${category}`
    const options = {
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const {projects} = fetchedData
      const updateFetchedData = projects.map(eachProject => ({
        id: eachProject.id,
        name: eachProject.name,
        imageUrl: eachProject.image_url,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        projectsList: updateFetchedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getProjectsList()
  }

  renderCategoriesDropDown = () => (
    <div className="categories-container">
      <select
        className="select-category"
        onChange={e =>
          this.setState({category: e.target.value}, this.getProjectsList)
        }
      >
        {categoriesList.map(eachOption => (
          <option value={eachOption.id} key={eachOption.id}>
            {eachOption.displayText}
          </option>
        ))}
      </select>
    </div>
  )

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#328af2" />
    </div>
  )

  renderFailureView = () => <FailureView onClickRetry={this.onClickRetry} />

  renderSuccessView = () => {
    const {projectsList} = this.state
    return (
      <ul className="projects-list">
        {projectsList.map(eachProject => (
          <li key={eachProject.id} className="project-card">
            <img
              className="project-image"
              src={eachProject.imageUrl}
              alt={eachProject.name}
            />
            <p className="project-name">{eachProject.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderProjectsView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-page">
        <Header />
        <div className="projects-container">
          {this.renderCategoriesDropDown()}
          {this.renderProjectsView()}
        </div>
      </div>
    )
  }
}
export default Home
