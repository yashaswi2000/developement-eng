import React, { Component } from "react";
import { toast } from 'react-toastify';

export class AddComment extends Component {
  addComment = e => {
    e.preventDefault();

    const comment = this.commentInput.value;

    if (!comment) return toast.error("Write a comment");

    this.props.addComment(comment);
    this.commentInput.value = "";
  };

  render() {
    return (
      <div  className="add_Post_form" style={{padding:"0", width: '90%', margin: 'auto'}}>
      <hr/>
          <form onSubmit={this.addComment} className="form-inline">
           
            <textarea
              placeholder="Add a comment..."
               ref={elem => (this.commentInput = elem)}
            ></textarea>
            <button className="w3-button w3-red">Comment</button>
          </form>
       
      </div>
    );
  }
}

export default AddComment;
