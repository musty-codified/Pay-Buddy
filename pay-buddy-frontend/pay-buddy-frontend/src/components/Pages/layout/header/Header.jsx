import React from 'react'
import Logo from "../../../../assets/images/LOGOKEND-01.png";
import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">PAY-BUDDY</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
          <Link to ="/"  className="nav-link active">Home</Link>
          </li>
          <li className="nav-item">
          <Link to ="/login"  className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
          <Link to ="/register"  className="nav-link">Register</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
}

export default Header