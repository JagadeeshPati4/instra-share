import {Component} from 'react'

import {BsHeart, BsHeartFill} from 'react-icons/bs'

import {FaRegComment} from 'react-icons/fa'

import {BiShareAlt} from 'react-icons/bi'

import Cookies from 'js-cookie'

import './index.css'

class Userpost extends Component {
  state = {
    isLiked: false,
  }

  islikedTogle = async () => {
    this.setState(prevState => ({isLiked: !prevState.isLiked}))
    const {post} = this.props
    const {postId} = post
    const {isLiked} = this.state
    const likeBody = {
      like_status: isLiked,
    }
    const token = Cookies.get('jwt_token')
    const apiIsliked = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearear ${token}`,
      },
      method: 'POST',
      body: JSON.stringify(likeBody),
    }
    const responce = await fetch(apiIsliked, options)
    const res = await responce.json()
    console.log('res', res)
  }

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
    const {isLiked} = this.state
    return (
      <div className="user-post-container">
        <div className="post-profile-container">
          <div className="profile-container">
            <img className="profile-image" src={profilePic} alt="profile-pic" />
          </div>
          <p className="post-user-name">{userName}</p>
        </div>
        <div className="post-container">
          <img
            className="post-image"
            src={postDetails.image_url}
            alt="post-pic"
          />
        </div>
        <div className="comment-container">
          <div className="like-section">
            {isLiked ? (
              <button type="button" onClick={this.islikedTogle()}>
                <BsHeartFill size={25} />
              </button>
            ) : (
              <button type="button" onClick={this.islikedTogle()}>
                <BsHeart size={25} />
              </button>
            )}
            <button type="button">
              <FaRegComment size={25} />
            </button>
            <button type="button">
              <BiShareAlt size={25} />
            </button>
          </div>
          <div>
            <p className="likes">
              {isLiked ? likesCount + 1 : likesCount} likes
            </p>
            <p className="caption">{postDetails.caption}</p>
            {comments.map(comment => (
              <p key={comment.user_id} className="comments">
                <span className="commented-user">{comment.user_name} </span>
                <span className="user-comment">{comment.comment}</span>
              </p>
            ))}
            <p className="created-date">{createdAt}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Userpost
