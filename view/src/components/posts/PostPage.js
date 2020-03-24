import React, { Component } from "react";
import Axios from "axios";
import moment from "moment";
import mongoose from "mongoose";
import Comment from "./Comment";
import AddComment from "./AddComment";
import { Link } from "react-router-dom";

export class PostPage extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
      loggedUser: {},
      user: {},
      postId: "",
      code: "",
      text: "",
      title: "",
    };

    this.addComment = this.addComment.bind(this);
  }

  postCreationTime() {
    const { postId } = this.state;

    if (!postId) return;

    const isoDate = mongoose.Types.ObjectId(postId).getTimestamp();
    const mom = new moment(isoDate);
    const now = new moment();
    const duration = moment.duration(now.diff(mom));

    return duration.humanize();
  }

  componentDidMount() {
    if(!this.props.location.state) this.props.history.push('/')

    const { _id, code, text, title, user } = this.props.location.state;

    let loggedUser = localStorage.user;
    if (loggedUser) loggedUser = JSON.parse(loggedUser);

    this.setState({
      postId: _id,
      loggedUser,
      code,
      text,
      title,
      user
    });

    Axios.get(`/comments/${_id}`)
      .then(res => {
        this.setState({ comments: res.data });
      })
      .catch(err => console.log(err));
  }

  addComment(commentInput) {
    const { postId, loggedUser } = this.state;

    const newComment = {
      postId: postId,
      userId: loggedUser._id,
      text: commentInput,
      user: {
        name: loggedUser.name,
        image: loggedUser.image
      }
    };

    Axios.post("/comments", newComment)
      .then(res => {
        this.setState({ comments: [...this.state.comments, res.data] });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { code, text, title, user } = this.state;
    return (
      <div className="container">
        <div>
          <div>
           
            <div>{user.name}</div>
            <span className="userinfo_date float-right">
              {this.postCreationTime()} ago
            </span>
          </div>
          <div>
            <h4>{title}</h4>
            <p>{text}</p>
            { code ? <pre className="code bg-dark p-3 text-light">{code}</pre> : null }
          </div>
        </div>

        <div >
          {this.state.loggedUser ? (
            <AddComment addComment={this.addComment} />
          ) : (
            <Link to="/register" className="w3-button w3-blue">
              Register to add a comment
            </Link>
          )}
        </div>

       
        <div className="comments">
        <h2 className="w3-center">
          Comments List
        </h2>
          {this.state.comments.map(comment => (
            <Comment key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    );
  }
}

export default PostPage;
