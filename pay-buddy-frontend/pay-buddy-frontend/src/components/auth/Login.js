import React, {useRef, useState} from "react";
import logo from "../../assets/images/logo.svg";
import Email from "./authenticationManager/Email";
import { useEffect } from "react";
import {useGoogleLogin} from '@react-oauth/google';
import googleLogo from "../../assets/images/google-logo.png";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import appApi from "../../apis/AppApi";
import { notifyError, notifySuccess } from "../notification/Toastify";
import { ToastContainer } from "react-bootstrap";

function Login() {
  const navigate= useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [user, setUser] = useState(null);

  const [formData, setFormData] = useState({});
  let   loginRef = useRef();

  const handleChange = (e) =>{
    e.persist();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });


  const localLogin = (data) => {
    appApi.post("/api/v1/auth/login",data)
        .then(res => {
          console.log(res.data.token);
          loginRef = loginRef.current.reset();
          localStorage.setItem("token",res.data.token)
          notifySuccess("Login suceessful");
          navigate("/pay-buddy/dashboard");
        })
        .catch(err => {
          notifyError("Internal server error!");
        });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    localLogin(formData);
  }

  const socialLogin = (data) =>  {
    appApi.post("/api/v1/auth/social-login",data)
        .then(res => {
            localStorage.setItem("token",res.data.jwtToken)
            notifySuccess("Login suceessful");
            navigate("/pay-buddy/dashboard");
        })
        .catch(err => {
          notifyError("Internal server error!");
        });
  }

  useEffect(
      () => {
        if (user) {
          console.log(user);
          axios
              .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json'
                }
              })
              .then((res) => {
                console.log(res.data);
                localStorage.setItem("userProfile",JSON.stringify(res.data));
                const userDetails = res.data;
                const data = {
                  email: userDetails.email,
                  firstName : userDetails.family_name,
                  lastName : userDetails.given_name,
                  password: "",
                  profileUrl: ""
                }
                socialLogin(data);
                navigate("/pay-buddy/dashboard");
              })
              .catch((err) => console.log(err));
        }
      },
      [ user ]
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 c-padding">
          <img src={logo} alt="Logo" width="72" height="72" />
          <h4 className="h4 mb-3 mt-3">Log in</h4>
          <span>Enter your details to access your account</span>

          <div className="mb-3 mt-3 form-control align-items-center social-login" onClick={() => login()}>
            <center>
              <img src={googleLogo} alt="Google" width="25" height="25"/>
              <span> Log in with Google</span>
            </center>
          </div>

          <div className="form-control line-break">
            <div className="">Or</div>
          </div>

          <form onSubmit={handleSubmit} ref={loginRef}>
            <div className="mb-3 mt-5">
              <label htmlFor="username" className="form-label">
                Email address
              </label>
              <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="email"
                  placeholder="name@companyemail.com"
                  onChange={handleChange} required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label text-start">
                Password
              </label>
              <div className="float-end font-color-600">
                <a onClick={handleOpen} href="#!">
                  Forgot Password
                </a>
              </div>
              <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Password123@"
                  onChange={handleChange} required
              />
            </div>

            <div className="mb-3 mt-5">
              <button className="btn btn-primary c-submit-button">Sign in</button>
            </div>

            <div className="mb-3">
              Not a member? <span className="font-color-600"><Link to="/register">Sign Up</Link></span>
            </div>
          </form>
        </div>



        <div className="col-md-8 bg-color-50 banner">
          <div class="h-100vh"></div>
        </div>
      </div>

      <Email open={open} handleClose={handleClose} handleOpen={handleOpen} />

      <div className="rectangle-2">
                <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
