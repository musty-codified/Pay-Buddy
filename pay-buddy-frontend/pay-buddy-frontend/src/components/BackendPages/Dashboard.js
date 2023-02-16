import React from 'react';
import Sidebar from "./layout/Sidebar";

function Dashboard() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10 bg-color-50 banner">
                    <div className="h-100vh"></div>
                </div>
            </div>

        </div>
    );
}

export default Dashboard;