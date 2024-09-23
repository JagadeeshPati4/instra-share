import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Spinner from '../Loder'

import './index.css'

const apiConfigurations = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 8,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1300,
      settings: {slidesToShow: 8},
    },
    {
      breakpoint: 1200,
      settings: {slidesToShow: 7},
    },
    {
      breakpoint: 1100,
      settings: {slidesToShow: 6},
    },
    {
      breakpoint: 900,
      settings: {slidesToShow: 5},
    },
    {
      breakpoint: 768,
      settings: {slidesToShow: 4},
    },
    {
      breakpoint: 512,
      settings: {slidesToShow: 3},
    },
  ],
}

class StoriesSlide extends Component {
  state = {
    apiStatus: apiConfigurations.initial,
    userStories: [],
  }

  componentDidMount() {
    this.getUserStories()
  }

  getUserStories = async () => {
    this.setState({apiStatus: apiConfigurations.inProgress})

    const token = Cookies.get('jwt_token')
    console.log(token)
    const apiStories = 'https://apis.ccbp.in/insta-share/stories'

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiStories, options)
      if (response.ok) {
        const data = await response.json()
        console.log('data', data)
        this.setState({
          userStories: data.users_stories,
          apiStatus: apiConfigurations.success,
        })
      } else {
        this.setState({apiStatus: apiConfigurations.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiConfigurations.failure})
    }
  }

  failureCase = () => (
    <div className="main-container">
      <h1>Failure View</h1>
      <button type="button" onClick={this.getUserStories}>
        Retry
      </button>
    </div>
  )

  inProgressCase = () => (
    <div className="main-container">
      <Spinner />
    </div>
  )

  renderSlider = () => {
    const {userStories} = this.state
    console.log('userStories', userStories)
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {userStories.map(story => {
            const {
              user_id: userId,
              story_url: storyUrl,
              user_name: userName,
            } = story

            return (
              <div className="slick-item" key={userId}>
                <img className="story-image" src={storyUrl} alt="user story" />
                <p className="user-story-name">{userName}</p>
              </div>
            )
          })}
        </Slider>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConfigurations.inProgress:
        return this.inProgressCase()
      case apiConfigurations.failure:
        return this.failureCase()
      case apiConfigurations.success:
        return this.renderSlider()
      default:
        return null
    }
  }
}

export default StoriesSlide
