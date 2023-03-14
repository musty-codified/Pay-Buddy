import React, {useRef, useState, useEffect} from "react";
import logo from "../../assets/images/logo.svg";
import Email from "./authenticationManager/Email";
import {useGoogleLogin} from '@react-oauth/google';
import googleLogo from "../../assets/images/google-logo.png";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import appApi from "../../apis/AppApi";
import { ToastContainer } from 'react-toastify';
import { notifyError, notifySuccess, notifyWarning } from '../notification/Toastify';
import LoadingSpin from "react-loading-spin";

function Login() {
  const [responseStatus, setResponseStatus] = useState(null);
  const[isLoading, setIsLoading] = useState(false)
  const navigate= useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [oauth2Response, setOauth2Response] = useState(null);
  let user = {}

  const [formData, setFormData] = useState({});
  let   loginRef = useRef();

  const handleChange = (e) =>{
    e.persist();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setOauth2Response(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });


  const localLogin = (data) => {
    appApi.post("/api/v1/auth/login",data)
        .then(res => {
          console.log(res.data.token);
          loginRef = loginRef.current.reset();
          localStorage.setItem("token",res.data.token)
          localStorage.setItem("user",JSON.stringify(res.data))
          notifySuccess("Login suceessful");
         navigate("/pay-buddy/dashboard");
          setIsLoading(false);
        })
        .catch(err => {
          notifyError(err.response.data.message[0]);
          setResponseStatus(err.response.data.message[0])
          setIsLoading(false);
        });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
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
        if (oauth2Response) {
          console.log(oauth2Response);
          axios
              .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${oauth2Response.access_token}`, {
                headers: {
                  Authorization: `Bearer ${user.access_token}`,
                  Accept: 'application/json'
                }
              })
              .then((res) => {
                const userDetails = res.data;
                console.log(userDetails);
                user ={
                  email: userDetails.email,
                  firstName : userDetails.family_name,
                  lastName : userDetails.given_name,
                  password: "",
                  picture: userDetails.picture

                }

                localStorage.setItem("user",JSON.stringify(user));
                socialLogin(user);
               // navigate("/pay-buddy/dashboard");
              })
              .catch((err) => console.log(err));
        }
      },
      [ user ]
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 c-padding scrol-vertical">
          <img src={logo} alt="Logo" width="72" height="72" />
          <h6 className="h6 mb-3 mt-3 display-6 title-text" style={{color:"#000"}}>Log in</h6>
          <span>Enter your details to access your account</span>

          <div className="mb-3 mt-3 form-control align-items-center social-login form-control-c" onClick={() => login()}>
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
                  className="form-control form-control-c"
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
                  className="form-control form-control-c"
                  id="password"
                  name="password"
                  placeholder="Password123@"
                  onChange={handleChange} required
              />
            </div>

            <div className="mb-3 mt-5">
              {responseStatus && <div className="text-danger">{responseStatus}</div>}
              <button className="btn btn-primary c-submit-button">
                { isLoading &&<LoadingSpin size="40px" color="white" numberOfRotationsInAnimation={3}/>}<span>Sign in</span></button>
            </div>

            <div className="mb-3">
              Not a member? <span className="font-color-600"><Link to="/register">Sign Up</Link></span>
            </div>
          </form>
        </div>

        <div className="col-md-8 bg-color-600 banner p-5 fixed-position">
          <div class="h-100vh">
          <div className="info-header">
                <div className="register-text">
                    <h3>It takes 20 years to build a reputation 
                        and five minutes<br/> to ruin it, 
                        if you think about that, you'll do things 
                        <br/>differently."</h3>
                </div>
                <div className="quote-owner-details">
                <h5 className="quote-owner-h4">-Boluwatife</h5>
                <p className="quote-office-p">Founder,Pay-Buddy</p>
               </div>
            </div>

            <div className="right-div-design">     
            <div className="rectangle-1">   
            <div className="rectangle-2">
                <ToastContainer />
             </div>
            </div>
            </div>

          </div>
        </div>
      </div>

      <Email open={open} handleClose={handleClose} handleOpen={handleOpen} />
    </div>
  );
}

export default Login;