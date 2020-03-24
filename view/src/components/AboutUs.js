import React, { Component } from "react";

export default class Contact extends Component {
  submitHandler = e => {
    e.preventDefault();

    if (this.name.value.length > 0 && this.email.value.length > 0)
      this.props.history.push("/");
  };

  render() {
    return (
      <div>
      <p>Rohit kumar 3rd year Cse student , Project for Edgistify</p>
      </div>
    );
  }
}
