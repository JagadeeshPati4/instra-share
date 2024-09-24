import {Component} from 'react'

class Userpost extends Component {
  render() {
    const {post} = this.props
    const {
      profilePic,
      userName,
      userId,
      likesCount,
      comments,
      createdAt,
      postDetails,
    } = post
    return (
      <div className="user-post-container">
        <div className="post-profile-containre">
          <div className="profile-container">
            <img src={profilePic} alt="profile-pic" />
          </div>
        </div>
      </div>
    )
  }
}

export default Userpost
