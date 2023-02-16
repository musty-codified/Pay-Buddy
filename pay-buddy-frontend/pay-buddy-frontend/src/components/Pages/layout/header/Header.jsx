import React from 'react'
import Logo from "../../../../assets/images/LOGOKEND-01.png";
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from "react-router-dom";
import './Header.css'

const Header = () => {
  return (
    <header>
      <div className='header-logo'>
      <img src={Logo} alt="" />
      <span>
        PAY-BUDDY
      </span>
      </div>
      <nav>
        <Link to ="/">Home</Link>
        <a href="pay-buddy-frontend/pay-buddy-frontend/src/pages/navBar/NavBar#">About</a>
        <Link to ="/login">Login</Link>
        <Link to ="/register">Signup</Link>
        <button className='nav-btn nav-close-btn'>
          <FaTimes />
        </button>
      </nav>
      <button className='nav-btn'>
          <FaBars />
        </button>
    </header>
  );
}

export default Header