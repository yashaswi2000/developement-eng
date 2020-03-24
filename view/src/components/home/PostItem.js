import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import mongoose from "mongoose";
// import Axios from 'axios';

export class Post extends Component {
  creationTime() {
    const { _id } = this.props.post;
    const isoDate = mongoose.Types.ObjectId(_id).getTimestamp();
    const mom = new moment(isoDate);
    const now = new moment();
    const duration = moment.duration(now.diff(mom));

    return duration.humanize();
  }

  
    render() {
      const { _id, title, code, text, user } = this.props.post;
      return (
      <div className ="add_Post_form">
         <div className="w3-row" >
           
            <div className= "w3-padding-24 w3-center"><strong>{user.name}</strong></div>
            <div className="w3-right-align">
            <span className="w3-center">{this.creationTime()} ago</span></div>
            <div className="w3-padding-8">
              <h4>{title}</h4>
              <p>
                {text}
              </p>
              <div>

              {code ? <textarea disabled={true} value={code} ></textarea> : null}
              </div>
              
            </div>
            <div className="pos_anser">
              <Link
                className="text-light"
                to={{ pathname: `/post/${_id}`, state: this.props.post }}
              >
                <button className="w3-button w3-red">Comments</button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
}

export default Post;
