import React from "react";
import "./welcome.css";
// import successScreen from "../../assets/images/successScreen.svg";
import { useLocation, useNavigate } from "react-router-dom";
import successScreen from "../../assets/images/successScreen.svg";

const Welcome = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <div className="welcome__parent">
      <div className="welcome__content">
        <img src={successScreen} className="img-fluid" />
          <div className="successMessage">
            <h1>Congratulations {state}🥳</h1>
            <p>Your account has been created. Sign in to view your dashboard</p>
            <button onClick={(e) => login(e)}>Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
