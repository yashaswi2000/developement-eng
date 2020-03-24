import React, { Component } from "react";
import NewPost from "./NewPost";
import Post from "./PostItem";
import Axios from "axios";

export class Home extends Component {
  state = {
    posts: []
  };

  userLoggedIn() {
    let loggedUser = localStorage.user;

    if (loggedUser) loggedUser = JSON.parse(loggedUser);

    return loggedUser ? true : false;
  }

  componentDidMount() {
    Axios.get("/posts")
      .then(res => {
        this.setState({ posts: res.data.reverse() });

      })
      .catch(err => console.log(err));
  }

  addPost = newPost => {
    Axios.post("/posts", newPost)
      .then(res => {
        this.setState({ posts: [res.data, ...this.state.posts] });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
    
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              {this.userLoggedIn() ? <NewPost addPost={this.addPost} /> : null}
              {this.state.posts.map(post => {
                return <Post post={post} key={post._id} />;
              })}
            </div>
          </div>
       
      </div>
    );
  }
}

export default Home;
