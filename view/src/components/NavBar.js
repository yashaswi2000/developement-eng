import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NavBar extends Component {
  scrollWin = () => window.scrollTo(0, 0);

  logOut = () => {
    this.props.userLogged(false);
    localStorage.clear();
  };

  collapse() {
    const toggle = document
      .querySelector(".navbar-collapse")
      .classList.contains("show");
    if (toggle) document.querySelector(".navbar-toggler").click();
  }

  render() {
    setTimeout(() => {
      if(document.getElementById("loder"))
        document.getElementById("loder").style.display = "none";
    }, 1500);

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item animated fadeInDown delay-1s" onClick={this.collapse}>
              <Link to="/" className="nav-link active  ">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item animated fadeInDown delay-2s" onClick={this.collapse}>
              {this.props.isLogged ? (
                <Link className="nav-link" to="/profile">
                  {JSON.parse(localStorage.user).name}
                </Link>
              ) : null}
            </li>
            <li className="nav-item animated fadeInDown delay-4s" onClick={this.collapse}>
              {this.props.isLogged ? (
                <Link className="nav-link" to="/" onClick={this.logOut}>
                  Logout
                </Link>
              ) : (
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;
