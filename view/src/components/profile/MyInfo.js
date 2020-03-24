import React, { Component } from "react";

export class MyInfo extends Component {
  render() {
    const { name, email, phone } = this.props;
    return (
      <div>
        <p>{name}</p>
      </div>
    );
  }
}

export default MyInfo;
