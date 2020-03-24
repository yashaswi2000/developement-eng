import React, { Component } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";

export class SignUp extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm: "",
      image: "",
      imageSrc: ""
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHanlder = this.submitHanlder.bind(this);
    this.validator = new SimpleReactValidator({
      element: message => <div className="text-danger m-0">{message}</div>,
      validators: {
        match: {
          message: "Do not match the password.",
          rule: val => val === this.state.password
        }
      }
    });
  }

  changeHandler(e) {
    if (e.target.name === "image") {
      try {
        this.setState({ imageSrc: URL.createObjectURL(e.target.files[0]) });
        this.convertTo64base();
      } catch (e) {
        return;
      }



      this.showModal();
      return;
    }

    this.setState({ [e.target.name]: e.target.value });
  }

  convertTo64base() {
    const c = document.createElement('canvas');
    const img = document.getElementById('user-image');
    c.height = img.naturalHeight;
    c.width = img.naturalWidth;

    const ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, c.width, c.height);
    
    const base64String = c.toDataURL();

    this.setState({
      image: base64String
    })

    return base64String;
  }

  showModal() {
    const imageModal = document.querySelector("#exampleModal");
    imageModal.classList.add("show");
    imageModal.style.display = "block";
  }

  hideModal() {
    const imageModal = document.querySelector("#exampleModal");
    imageModal.classList.remove("show");
    imageModal.style.display = "none";
  }

  submitHanlder(e) {
    e.preventDefault();

    if (this.validator.allValid()) {
      Axios.post("/signup", this.state)
        .then(res => this.checkResponse(res.data))
        .catch(err => console.log(err));
    } else {
      toast.error("Check the input fields");
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  checkResponse(res) {
    if (res === "this email already have an account")
      return toast.error("This email already have an account!");
    else if (typeof res === "object") {
      const user = res;
      localStorage.setItem("user", JSON.stringify(user));

      this.props.userLogged(true);

      this.props.history.push({
        pathname: "/",
        state: user
      });
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitHanlder}>
          <ToastContainer
            position={toast.POSITION.TOP_LEFT}
            transition={Zoom}
            toastClassName="rounded"
            hideProgressBar={true}
          />
          <div className="form-group form-box">
            <input
              onChange={this.changeHandler}
              value={this.state.name}
              type="text"
              name="name"
             
              placeholder="User Name"
            />
            {this.validator.message(
              "name",
              this.state.name,
              "required|alpha_space"
            )}
          </div>
          <div className="form-group form-box">
            <input
              onChange={this.changeHandler}
              value={this.state.email}
              type="email"
              name="email"
              placeholder="Email Address"
            />
            {this.validator.message(
              "email",
              this.state.email,
              "required|email"
            )}
          </div>
          <div className="form-group form-box">
            <input
              onChange={this.changeHandler}
              value={this.state.phone}
              type="phone"
              name="phone"
              placeholder="Phone Number"
            />
            {this.validator.message(
              "phone",
              this.state.phone,
              "required|numeric"
            )}
          </div>
          <div className="form-group form-box">
            <input
              onChange={this.changeHandler}
              value={this.state.password}
              type="password"
              name="password"
              placeholder="Password"
            />
            {this.validator.message(
              "password",
              this.state.password,
              "required|min:8|max:50"
            )}
          </div>
          <div className="form-group form-box">
            <input
              onChange={this.changeHandler}
              value={this.state.confirm}
              type="password"
              name="confirm"
              placeholder="Confirm Password"
            />
            {this.validator.message(
              "confirm",
              this.state.confirm,
              "required|match"
            )}
          </div>
          
          <div className="checkbox clearfix"></div>
          <div className="form-group mb-0">
            <button type="submit" className="btn-md btn-theme btn-block">
              Sign Up
            </button>
          </div>
        </form>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body" style={{ height: "19rem" }}>
                <img
                  id="user-image"
                  src={this.state.imageSrc}
                  alt="user"
                  style={{ display: "block", width: "100%", height: "100%", visibility: this.state.image ? "visible" : "hidden" }}
                />
              </div>
              <div className="modal-footer">
                <button
                  onClick={this.hideModal}
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SignUp);
