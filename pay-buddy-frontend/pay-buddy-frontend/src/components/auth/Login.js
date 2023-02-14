import React, { useState } from "react";
import logo from "../../assets/icons/logo.svg";
import Email from "./authenticationManager/Email";
import { GoogleLogin } from "react-google-login";
import { useEffect } from "react";
import { gapi } from "gapi-script";

function Login() {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: ["profile", "email"],
      });
    }
    gapi.load("client:auth2", start);
  });

  const clientId =
    "887116854395-0mo6aorlnmr7bci8apjvjl7p5tnqin8b.apps.googleusercontent.com";

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! ", res.profileObj);
  };
  const onFailure = (res) => {
    console.log("LOGIN FAILED! ", res);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4 c-padding">
          <img src={logo} alt="Logo" width="72" height="72" />
          <h4 className="h4 mb-3 mt-3">Log in</h4>
          <span>Enter your details to access your account</span>

          <div className="mb-3 mt-3 align-items-center">
            <center>
              <GoogleLogin
                clientId={clientId}
                buttonText="Log in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
                className="form-control social-button"
              />
            </center>
          </div>

          <div className="form-control line-break">
            <div className="">Or</div>
          </div>

          <div className="mb-3 mt-5">
            <label htmlFor="username" className="form-label">
              Email address
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="name@companyemail.com"
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
            />
          </div>

          <div className="mb-3 mt-5">
            <button className="btn btn-primary c-submit-button">Sign in</button>
          </div>

          <div className="mb-3">
            Not a member? <span className="font-color-600">Sign Up</span>
          </div>
        </div>

        <div className="col-md-8 bg-color-50 banner">
          <div class="h-100vh"></div>
        </div>
      </div>

      <Email open={open} handleClose={handleClose} handleOpen={handleOpen} />
    </div>
  );
}

export default Login;
