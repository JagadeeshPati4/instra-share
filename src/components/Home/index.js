import {Component} from 'react'
import {withRouter} from 'react-router-dom'

import UserPosts from '../Userposts'
import UserStories from '../Stores'
import Header from '../Header'
import MyProfile from '../MyProfile'
import UserProfile from '../UserProfile'
import './index.css'

class Home extends Component {
  render() {
    const {location, match} = this.props

    return (
      <>
        <Header />
        <main className="home-container">
          {location.pathname === '/' && (
            <>
              <UserStories />
              <UserPosts />
            </>
          )}

          {location.pathname === '/my-profile' && <MyProfile />}

          {location.pathname.startsWith('/users/') && match.params.userId && (
            <UserProfile userId={match.params.userId} />
          )}
        </main>
      </>
    )
  }
}

export default withRouter(Home)
