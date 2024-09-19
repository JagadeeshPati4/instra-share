import React from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoClose} from 'react-icons/io5'
import {FaSearch} from 'react-icons/fa'
import './index.css'

const Header = () => (
  <nav className="header-nav">
    <div className="header-left-container">
      <div className="left-container">
        <img src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="logo" />
        <h1>Instra Share</h1>
      </div>
      <div className="burgger-button">
        <button>
          <GiHamburgerMenu size={25} />
        </button>
      </div>
    </div>
    <div className="header-right-conatiner">
      <div className="header-search">
        <input type="text" />
        <FaSearch />
      </div>
      <li>home</li>
      <li className="search-li">Search</li>
      <li>Profile</li>
      <button className="logout-button">Logout</button>
      <button className="close-button">
        <IoClose size={25} />
      </button>
    </div>
  </nav>
)

export default Header
