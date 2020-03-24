import React, { Component } from "react";
import { toast } from 'react-toastify';

export class NewPost extends Component {
  submit = e => {
    e.preventDefault();

    const text = this.text.value;
    const title = this.title.value;
    const code = this.code.value;
    const loggedUser = JSON.parse(localStorage.user);
    const newUser = {
      title,
      text,
      code,
      userId: loggedUser._id,
      user: {
        name: loggedUser.name,
        image: loggedUser.image
      }
    };

    if(text && title) {
      this.props.addPost(newUser);
      toast.success("Added a post.");
    }
    else {
      return toast.error("Write Post title and content.");
    }
      
    this.emptyInputFields();
  };

  emptyInputFields() {
    this.text.value = "";
    this.title.value = "";
    this.code.value = "";
  }

  render() {
    return (
      <div className="add_Post_form">
        
        <form onSubmit={this.submit}>
        
          <h4 className="w3-center">Create New Post</h4>
          <div className="w3-column">
          <input
            ref={elem => (this.title = elem)}
            type="text"
            placeholder="Tittle"
          />
          <textarea
            ref={elem => (this.text = elem)}
            placeholder="Question/Query"
          ></textarea>
          <textarea
            ref={elem => (this.code = elem)}
            
            placeholder="Description"
          ></textarea>
          <button>Publish</button>
          </div>
        </form>
        
      </div>
    );
  }
}

export default NewPost;
