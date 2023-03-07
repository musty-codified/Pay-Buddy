import React from "react";
import "./welcome.css";
import { useLocation, useNavigate } from "react-router-dom";

const Welcome = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    navigate("/login");
  }

  return (
    <div className="welcome__parent">
      <div className="welcome__content bg-color-600">
        <h1>Congratulations {state}🥳</h1>
        <p>Your account has been created. Sign in to view your dashboard</p>
        <button onClick={(e) => login(e)}>Continue</button>
      </div>
    </div>
  );
};

export default Welcome;
