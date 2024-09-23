import React, {useState, useEffect} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoClose} from 'react-icons/io5'
import {FaSearch} from 'react-icons/fa'
import './index.css'

const Header = () => {
  const [open, setOpen] = useState(false)
  const [searchOpen, setSearchOpne] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    const handleMediaChange = e => {
      setIsMobile(e.matches)
    }

    handleMediaChange(mediaQuery)

    mediaQuery.addEventListener('change', handleMediaChange)

    return () => mediaQuery.removeEventListener('change', handleMediaChange)
  }, [])
  return (
    <nav className="header-nav">
      <div className="header-left-container">
        <div className="left-container">
          <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="logo" />
          <h1>Instra Share</h1>
        </div>
        <div className="burgger-button">
          <button type="button" onClick={() => setOpen(!open)}>
            <GiHamburgerMenu size={25} />
          </button>
        </div>
      </div>
      <div
        className={`header-right-conatiner ${
          open && isMobile ? 'open' : 'close'
        }`}
      >
        <div
          className={`header-search ${
            searchOpen && isMobile ? 'searchOpen' : 'searchClose'
          }`}
        >
          <input type="text" />
          <button className="search-btn" testid="searchIcon">
            <FaSearch />
          </button>
        </div>
        <div className="nav-controls">
          <li>home</li>

          <button
            className="search-li"
            type="button"
            onClick={() => setSearchOpne(!searchOpen)}
          >
            Search
          </button>

          <li>Profile</li>
          <button className="logout-button">Logout</button>
          <button className="close-button" onClick={() => setOpen(!open)}>
            <IoClose size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header
