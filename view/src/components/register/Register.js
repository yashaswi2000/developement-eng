import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import SignUp from "./SignUp";
import Login from "./Login";

export class Register extends Component {
  authGurd() {
    let loggedUser = localStorage.user;
    if (loggedUser) loggedUser = JSON.parse(loggedUser);
    if (loggedUser) this.props.history.push("/");
  }

  componentDidMount() {
    this.authGurd();
  }

  loginBtn = () => {
    document.getElementById("login").style.display = "block";
    document.getElementById("signup").style.display = "none";
  };

  signupBtn = () => {
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "block";
  };

  render() {
    return (
      <div className="login-10">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-4 col-lg-5 col-md-12 col-pad-0 bg-color-10">
              <div className="form-section ">
                <div className="logo">
                  <h3>Welcome To Login page</h3>
                </div>
                <div className="btn-section">
                  <button className="link-btn active" onClick={this.loginBtn}>
                    Login
                  </button>
                  <button className="link-btn" onClick={this.signupBtn}>
                    Sign Up
                  </button>
                </div>
                <div className="login-inner-form" id="login">
                  <Login userLogged={this.props.userLogged} />
                  
                </div>
                <div
                  className="login-inner-form "
                  style={{ display: "none" }}
                  id="signup"
                >
                  <SignUp userLogged={this.props.userLogged} />
               
                </div>
              </div>
            </div>
         
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
