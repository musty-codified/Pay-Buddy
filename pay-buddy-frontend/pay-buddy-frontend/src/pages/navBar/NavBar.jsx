import React from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import './NavBar.css'

const NavBar = () => {
  return (
    <header>
      <h3>PAY-BUDDY</h3>
      <nav>
        <a href="pay-buddy-frontend/pay-buddy-frontend/src/pages/navBar/NavBar#">Home</a>
        <a href="pay-buddy-frontend/pay-buddy-frontend/src/pages/navBar/NavBar#">About</a>
        <a href="pay-buddy-frontend/pay-buddy-frontend/src/pages/navBar/NavBar#">Signup</a>
        <a href="pay-buddy-frontend/pay-buddy-frontend/src/pages/navBar/NavBar#">Login</a>
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

export default NavBar