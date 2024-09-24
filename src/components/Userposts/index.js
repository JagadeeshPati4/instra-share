import {Component} from 'react'

import Cookies from 'js-cookie'

import Spinner from '../Loder'
import Userpost from '../Userpost'

const apiConfigurations = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}
class Userposts extends Component {
  state = {
    apiStatus: apiConfigurations.initial,
    userPosts: [],
  }

  componentDidMount() {
    this.getUserPosts()
  }

  inSucessView = () => {
    const {userPosts} = this.state
    return (
      <div className="posts-main-container">
        {userPosts.map(post => (
          <Userpost post={post} key={post.userId} />
        ))}
      </div>
    )
  }

  inFailureView = () => (
    <div className="failure-post-conatinar">
      <img
        src={`${process.env.PUBLIC_URL}/img/something-went-wrong.png`}
        alt="failure view"
      />
      <p>Something went wrong. Please try again</p>
      <button
        type="button"
        className="failure-button"
        onClick={this.getUserStories}
      >
        Retry again
      </button>
    </div>
  )

  inProgressView = () => (
    <div className="inprogess-post-container">
      <Spinner />
    </div>
  )

  getUserPosts = async () => {
    this.setState({apiStatus: apiConfigurations.inProgress})

    const token = Cookies.get('jwt_token')
    console.log(token)
    const apiStories = 'https://apis.ccbp.in/insta-share/posts'
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

        const userPost = data.posts.map(each => ({
          postId: each.post_id,
          profilePic: each.profile_pic,
          userId: each.user_id,
          userName: each.user_name,
          createdAt: each.created_at,
          likesCount: each.likes_count,
          postDetails: each.post_details,
          comments: each.comments,
          caption: each.caption,
        }))

        this.setState({
          userPosts: userPost,
          apiStatus: apiConfigurations.success,
        })
      } else {
        this.setState({apiStatus: apiConfigurations.failure})
      }
    } catch (error) {
      this.setState({apiStatus: apiConfigurations.failure})
    }
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConfigurations.inProgress:
        return this.inProgressView()
      case apiConfigurations.failure:
        return this.inFailureView()
      case apiConfigurations.success:
        return this.inSucessView()
      default:
        return null
    }
  }
}

export default Userposts
