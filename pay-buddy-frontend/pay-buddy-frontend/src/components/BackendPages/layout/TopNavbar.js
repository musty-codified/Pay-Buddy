import logo from "../../../assets/images/logo.svg";
import Ellipse from '../../../assets/icons/Ellipse.svg'
import {useNavigate} from "react-router-dom";
import { MyContext } from "../../../statemanagement/ComponentState";
import { useContext, useEffect } from "react";
const TopNavbar = () => {
  const { pagename, setPageName } = useContext(MyContext);


  let fullName="";
    let  profileImage ="";
    let token = localStorage.getItem("token");

    const navigate= useNavigate();
    const userProfile = localStorage.getItem("userProfile");
    if(token || userProfile){
        const user= JSON.parse(userProfile);
        fullName= user.name;
        profileImage = user.picture;
    }
    const logout = () => {
        localStorage.removeItem("userProfile");
        localStorage.removeItem("token");
        navigate("/login");
    }
    return ( 
        <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
            <div className="container-fluid">
              <div className="payment-caption">
                <p>{pagename}</p>
                <img style={{marginTop: '-10px'}} src={ Ellipse }/>
              </div>
              {/* Toggle button */}
              <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars" />
              </button>
              <a className="navbar-brand" href="#">
                <img src={logo} alt="Logo" width="45" height="45" loading="lazy" />
              </a>
              {/* Right links */}
              <ul className="navbar-nav ms-auto d-flex flex-row">
                {/* Notification dropdown */}
                <li className="nav-item dropdown">
                  <a className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                    <i className="fas fa-bell" />
                    <span className="badge rounded-pill badge-notification bg-danger">1</span>
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                    <li>
                      <a className="dropdown-item" href="#">New Message</a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                    <img src={profileImage} className="rounded-circle" height={30} alt="" loading="lazy" />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item" href="#">My profile</a></li>
                    <li><a className="dropdown-item" href="#">Settings</a></li>
                    <li><a className="dropdown-item" href="#" onClick={logout}>Logout</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
     );
}
 
export default TopNavbar;