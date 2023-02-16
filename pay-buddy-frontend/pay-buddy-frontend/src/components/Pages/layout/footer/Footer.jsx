import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className="main-footer">
      <div className="container">
        <div className="row">
          {/* Column1 */}
          <div className="col">
            <h4>PAY-BUDDY</h4>
            <ul className="list-unstyled">
              <li>+2348142274320</li>
              <li>Lagos, Nigeria</li>
              <li>Decagon Institute</li>
            </ul>
          </div>
          {/* Column2 */}
          <div className="col">
            <h4>Services</h4>
            <ul className="list-unstyled">
              <li>Artime Subscription</li>
              <li>DSTV Subscription</li>
              <li>Bank Transfer</li>
            </ul>
          </div>
          {/* Column3 */}
          <div className="col">
            <h4>Branch Offices</h4>
            <ul className="list-unstyled">
              <li>Edo-Tech Park, Benin</li>
              <li>Sangotedo, Lagos</li>
              <li>E-Library, Uyo</li>
            </ul>
          </div>
        </div>
        <hr />
        <div className='copy-right'>
          <p className="col-sm">
            &copy;{new Date().getFullYear()} PAY-BUDDY | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
      </div>
    </div>
  )
}
export default Footer