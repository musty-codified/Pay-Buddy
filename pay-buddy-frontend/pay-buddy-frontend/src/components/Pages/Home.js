import React from 'react'
import './Home.css';
import NavBar from "../../components/Pages/layout/header/Header";
import person from '../../assets/african-american-man-paying-with-credit-card-online-while-making-orders-via-mobile-internet-making-transaction-using-mobile-bank-application.jpeg'
import Footer from '../Pages/layout/footer/Footer';

const Home = () => {
  return (
    <div class="showcase-area">
      <NavBar />
      <img src={person} />
          <div class="showcase-content">
            <div class="left">
              <div class="big-title">
                <h1>The Future is here,</h1>
                <h1>Bank with PAY-BUDDY!</h1>
              </div>
              <p class="text">
              Welcome to our online payment platform! With our secure and easy-to-use system, you can make payments quickly and conveniently from anywhere in the world.
              All transactions are processed in real-time, ensuring that your payments are processed quickly and efficiently.
              </p>
              <div class="cta">
                <a href="pay-buddy-frontend/pay-buddy-frontend/src/components/homeBody/Text#" class="btn">Get started</a>
              </div>
            </div>
          </div>
          <Footer />
        </div>
        
  )
}

export default Home