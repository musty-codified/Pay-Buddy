import React from 'react'
import NavBar from "../../components/Pages/layout/header/Header";
import person from '../../assets/african-american-man-paying-with-credit-card-online-while-making-orders-via-mobile-internet-making-transaction-using-mobile-bank-application.jpeg'
import Footer from '../Pages/layout/footer/Footer';

const Home = () => {
  const fluidWidth = {width:"100%"}
  return (
    <div class="showcase-area">
      <NavBar />
      <div className='container-fluid'>
      <img src={person}  className="img-fluid" />
          <div class="showcase-content">
            <div class="d-flex flex-column justify-content-center align-items-center">
              <div class="big-title text-center">
                <h1>The Future is here,</h1>
                <h1>Bank with PAY-BUDDY!</h1>
              </div>
              <p class="lead text-center">
              Welcome to our online payment platform! With our secure and easy-to-use system, you can make payments quickly and conveniently from anywhere in the world.
              All transactions are processed in real-time, ensuring that your payments are processed quickly and efficiently.
              </p>
              <div class="">
                <a href="pay-buddy-frontend/pay-buddy-frontend/src/components/homeBody/Text#" class="btn">Get started</a>
              </div>
              <br/>
            </div>
          </div>
      </div>

          <Footer />
        </div>
        
  )
}

export default Home