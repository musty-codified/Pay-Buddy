import React from 'react'
import './Footer.css'

const Footer = () => {

  return (
    <footer class="">
      <div className='container'>
      <div class="row align-items-center">
        <div className='col-md-4'>
        <h4>PAY-BUDDY</h4>
             <ul className="list-unstyled">
               <li>+2348142274320</li>
               <li>Lagos, Nigeria</li>
              <li>Decagon Institute</li>
          </ul>
        </div>
        <div className='col-md-4'>
            <h4>Services</h4>
            <ul className="list-unstyled">
              <li>Artime Subscription</li>
              <li>DSTV Subscription</li>
              <li>Bank Transfer</li>
            </ul>
        </div>
        <div className='col-md-4'>
        <h4>Branch Offices</h4>
            <ul className="list-unstyled">
              <li>Edo-Tech Park, Benin</li>
              <li>Sangotedo, Lagos</li>
              <li>E-Library, Uyo</li>
            </ul>
        </div>
      </div>
      </div>
      

      <div>
          <p className='text-center'>
            &copy;{new Date().getFullYear()} PAY-BUDDY | All rights reserved |
            Terms Of Service | Privacy
          </p>
        </div>
    </footer>
  )
}
export default Footer