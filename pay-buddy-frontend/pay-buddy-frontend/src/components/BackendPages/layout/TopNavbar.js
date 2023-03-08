import logo from "../../../assets/images/logo.svg";
import notification from "../../../assets/images/notification.svg";
import usericon from "../../../assets/images/usericon.png";
import {useNavigate} from "react-router-dom";
import { MyContext } from "../../../statemanagement/ComponentState";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
const TopNavbar = () => {
  const { pagename, setPageName } = useContext(MyContext);
  const pageGroupName = (pagename =="Payment" || pagename=="Dashboard" || pagename=="Settings")?null:"Payment ";

    let fullName="";
    let  profileImage ="";
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");

    const navigate= useNavigate();
    
    if(token && user){
        user= JSON.parse(user);
        fullName= user.firstName +" " + user.lastName;
        profileImage = user.picture;
        console.log(user);

        console.log(fullName+" "+profileImage+" "+token)
        console.log(token);
    }else{
      navigate("/login");
    }
    const logout = () => {
        localStorage.removeItem("userProfile");
        localStorage.removeItem("token");
        navigate("/login");
    }
    return ( 
        <nav className="navbar navbar-expand-lg top-navbar fixed-top">
            <div className="container-fluid">
              <div className="page-title"><div><span>{pageGroupName  }</span>&nbsp;&nbsp;<span className="activePage">{pagename}</span></div></div>
              {/* Toggle button */}
              <button className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                <i className="fas fa-bars" />
              </button>
              <Link to="/pay_buddy/dashboard" className="navbar-brand">
                <img src={logo} alt="Logo" width="45" height="45" loading="lazy" /> <b>Pay Buddy</b>
              </Link>
              {/* Right links */}
              <ul className="navbar-nav ms-auto d-flex flex-row">
                {/* Notification dropdown */}
                <li className="nav-item dropdown">
                  <a className="nav-link me-3 me-lg-0 dropdown-toggle hidden-arrow" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                    <img src={notification} />
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                    <li>
                      <a className="dropdown-item" href="#">New Message</a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  
                    <a className="nav-link dropdown-toggle hidden-arrow d-flex align-items-center" href="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                      <div class="profileImage">      
                      {!profileImage &&  <img src={usericon} height={48} className="rounded-circle" loading="lazy" />}
                      {profileImage &&  <img src={profileImage} className="rounded-circle" height={48} alt="" loading="lazy" />}    
                      </div>
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