import "../../Pages/welcome.css";
import React from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import { currency } from '../../../includes/Config';

export default function BuyDataSuccessMessage() {
    const navigate = useNavigate();
    const {state} = useLocation();

  const dashboard = (e) => {
    e.preventDefault();
    navigate("/pay-buddy/dashboard");
  }
  return (
    <div className="welcome__parent">
      <div className="welcome__content bg-color-600">
        {<h1>Your data purchase was successful  🥳 </h1>}
        <p>Your data purchase of  {state.description} has been sent to {state.phoneNumber} </p>
        <button onClick={dashboard}>Continue</button>
      </div>
    </div>
  )
}