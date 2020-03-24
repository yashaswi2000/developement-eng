import React, { Component } from "react";
import MyPostsList from "./MyPostsList";
import axios from "axios";

export class MyProfile extends Component {
  state = {
    myInfo: {},
    myPosts: []
  };

  authGuard() {
    let loggedUser = localStorage.user;
 
    if(!loggedUser) {
      this.props.history.push('/register');
      return
    }

    loggedUser = JSON.parse(loggedUser);
    this.setState({ myInfo: loggedUser });
    return loggedUser;
  }

  componentDidMount() {
    const loggedUser = this.authGuard();
    
    if(loggedUser) {
    axios
      .get(`/posts/user/${loggedUser._id}`)
      .then(response => {
        this.setState({ myPosts: response.data.reverse() });
      })
      .catch(error => {
        console.log("Error", error);
      });
    }
  }

  deletePost = id => {
    axios
      .delete(`/posts/${id}`)
      .then(response => {
        const result = response.data;

        if (result.n && result.ok && result.deletedCount) {
          this.setState({
            myPosts: this.state.myPosts.filter(post => post._id !== id)
          });
        }
      })
      .catch(error => {
        console.log("Error", error);
      });
  };

  render() {
    const { myInfo, myPosts } = this.state;
    const { deletePost } = this;

    return (
      <div>
        <div>
        <div className="container">
             <h2>Welcome {myInfo.name}</h2>
          </div>

        </div>
       
        <div className="container">

            <MyPostsList myPosts={myPosts} deletePost={deletePost} />
        </div>
      </div>
    );
  }

   
}

export default MyProfile;
