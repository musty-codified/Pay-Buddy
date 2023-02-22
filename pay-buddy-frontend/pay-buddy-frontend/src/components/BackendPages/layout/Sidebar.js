import React from 'react';
import {Link} from "react-router-dom";
import homeLogo from "../../../assets/images/home-logo.svg";
import paymentLogo from "../../../assets/images/payment-logo.svg";
import settingsLogo from "../../../assets/images/settings-logo.svg";
import  "./layout.css";

function Sidebar() {
    return (
        <>
        <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
            <div className="position-sticky">
              <div className="list-group list-group-flush mx-3 mt-4">
              <Link to="/pay-buddy/dashboard" className="list-group-item list-group-item-action py-2 ripple"><img src={homeLogo}/> &nbsp;&nbsp;&nbsp;Home</Link>
              <Link to="/pay-buddy/payment" className="list-group-item list-group-item-action py-2 ripple payment-link"><img src={paymentLogo} />&nbsp;&nbsp;&nbsp; Payment</Link>
              <Link to="/pay-buddy/dashboard"  className="list-group-item list-group-item-action py-2 ripple"><img src={settingsLogo} />&nbsp;&nbsp;&nbsp; Settings</Link>
           </div>
            </div>
          </nav>
        </>
    );
}

export default Sidebar;