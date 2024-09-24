import Header from '../Header'
import StoriesSlide from '../Stores'
import Userposts from '../Userposts'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-second-conatiner">
      <StoriesSlide />
      <Userposts />
    </div>
  </>
)

export default Home
