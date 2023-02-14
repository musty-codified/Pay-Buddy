import React from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import './NavBar.css'

const NavBar = () => {
  return (
    <header>
      <h3>PAY-BUDDY</h3>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Signup</a>
        <a href="#">Login</a>
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