import React, { Component } from "react";
import MyPostItem from "./MyPostItem";

export class PostsList extends Component {
  render() {
    const { myPosts, deletePost } = this.props;
    return (
      <div>
        {myPosts.map(post => (
          <MyPostItem key={post._id} post={post} deletePost={deletePost} />
        ))}
      </div>
    );
  }
}

export default PostsList;
