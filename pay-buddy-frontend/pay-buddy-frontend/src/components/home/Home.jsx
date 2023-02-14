import React from 'react'
import './Home.css'
import person from '../../assets/person.png'

const Home = () => {
  return (
    <div class="showcase-area">
          <div class="showcase-content">
            <div class="left">
              <div class="big-title">
                <h1>The Future is here,</h1>
                <h1>Bank with PAY-BUDDY!</h1>
              </div>
              <p class="text">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Delectus eius distinctio odit, magni magnam qui ex perferendis
                vitae!
              </p>
              <div class="cta">
                <a href="pay-buddy-frontend/pay-buddy-frontend/src/components/homeBody/Text#" class="btn">Get started</a>
              </div>
            </div>

            <div class="right">
              <img src={person} alt="Person Image" class="person" />
            </div>
          </div>
        </div>
  )
}

export default Home