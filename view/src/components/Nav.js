import React, { Component } from "react";
import { BrowserRouter as  Router, Route , Link } from "react-router-dom";

import MyProfile from '../components/profile/MyProfile';
import Register from '../components/register/Register';
import Home from '../components/home/Home'
import NotFound from '../components/NotFound'

export class Navbar extends Component {
  render() {
    return (
      <Router>

      <div>
          {/* <nav class="navbar navbar-light bg-light">
          <Link to="/" >Home</Link>
          <Link to="/profile/:id" >My Profile</Link>
          <Link to="/register" >sign out</Link>
          </nav> */}



        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="#">
            
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">

              <li class="nav-item active">
              <Link to="/" class="nav-link" >Home <span class="sr-only">(current)</span></Link>
              </li>

              <li class="nav-item ">
                <Link to="/profile"  class="nav-link">My Profile</Link>
              </li>

              <li class="nav-item ">
              <Link to="/register"  class="nav-link">sign out</Link>
              </li>
            </ul>

            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  <button className="btn btn-info">log in</button>
                </a>
              
              </li>
              <li class="nav-item active">

              <a class="nav-link" href="#">
                  <button className="btn btn-info">Sign up</button>
                </a>
                </li>
            </ul>
          </div>
        </nav>


            
      </div>

      </Router>

    );
  }
}

export default Navbar;
