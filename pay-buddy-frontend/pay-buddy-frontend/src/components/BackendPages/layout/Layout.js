import React from 'react';
import { Link, Outlet } from "react-router-dom";
import Header  from "./Header";
import Footer from "./Footer";
import Sidebar from './Sidebar';
import TopNavbar from './TopNavbar';

const Layout = () => {
    return ( 
            <>
            <header>
             <Sidebar/>
             <TopNavbar />
            </header>
             <main style={{marginTop: '58px'}}>
                <div className="container pt-4">
                    <Outlet />
                </div>
            </main>
      <Footer />
      </>
     );
}
 
export default Layout;