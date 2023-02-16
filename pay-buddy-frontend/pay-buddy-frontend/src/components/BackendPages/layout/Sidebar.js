import React from 'react';
import {Link} from "react-router-dom";
import  "./layout.css";

function Sidebar() {
    return (
        <div className="side-bar">
            <ul>
                <li><Link to="/"><i className="fa fa-home" aria-hidden="true"></i> &nbsp;&nbsp;&nbsp;Home</Link></li>
                <li><Link to="/"><i className="fa fa-credit-card" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp; Payment</Link></li>
                <li><Link to=""><i className="fa fa-cog" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp; Settings</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;