import React, { Component } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import SimpleReactValidator from "simple-react-validator";
import { ToastContainer, toast, Zoom } from 'react-toastify';

export class Login extends Component {
  constructor() {
    super();

    this.state = { email: "", password: "" };
    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.validator = new SimpleReactValidator({
      element: message => <div className="text-danger m-0">{message}</div>
    });
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  submitHandler(e) {
    e.preventDefault();

    if (this.validator.allValid()) {
      Axios.post("/login", this.state)
      .then(res => this.checkResponse(res.data))
      .catch(err => console.log(err));
    } else {
      toast.error('Empty input fields')
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  checkResponse = res => {
    if (res === "user not existed") toast.error("User with this email is not existed!")
    else if (res === "email or password do not match")
      toast.error("Email and password do not match!");
    else if (Array.isArray(res) && res.length) {
      const loggedUser = res[0];
      localStorage.setItem("user", JSON.stringify(loggedUser));

      this.props.userLogged(true);

      this.props.history.push({
        pathname: "/",
        state: loggedUser
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.submitHandler}>
      <ToastContainer position={toast.POSITION.TOP_LEFT} transition={Zoom} toastClassName="rounded" hideProgressBar={true}/>
        <div className="form-group form-box">
          <input
            onChange={this.changeHandler}
            value={this.state.email}
            type="email"
            name="email"
            placeholder="Email Address"
          />
          {this.validator.message("email", this.state.email, "required|email")}
        </div>
        <div className="form-group form-box mb-5">
          <input
            onChange={this.changeHandler}
            value={this.state.password}
            type="password"
            name="password"
            className="animated bounceInLeft input-text"
            placeholder="Password"
          />
          {this.validator.message("password", this.state.password, "required")}
        </div>
        <div className="form-group mb-0">
          <button type="submit" className="btn-md btn-theme btn-block">
            Login
          </button>
        </div>
      </form>
    );
  }
}

export default withRouter(Login);
