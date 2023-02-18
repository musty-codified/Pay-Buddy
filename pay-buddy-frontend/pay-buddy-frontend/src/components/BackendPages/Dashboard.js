import React, { useContext } from 'react';
import { MyContext } from '../../statemanagement/ComponentState';
import Sidebar from "./layout/Sidebar";

function Dashboard() {
    const { name, setPageName } = useContext(MyContext);
    setPageName("Dashboard");
    return (
        
        <div className="h-100vh">DASHBOARD</div>
    );
}

export default Dashboard;