import React, { Component } from "react";
import { Link } from "react-router-dom";

export class NotFound extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="erorr_page">
          <p>404 </p>
          <h1>Page Not Found</h1>
          <Link to="/">
            <button className="btn btn-info">Back To Home Page</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default NotFound;
