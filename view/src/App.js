import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Home from "./components/home/Home";
import AboutUs from "./components/AboutUs";
import NotFound from "./components/NotFound";
import Register from "./components/register/Register";
import MyProfile from "./components/profile/MyProfile";
import PostPage from "./components/posts/PostPage";
import NavBar from "./components/NavBar";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  autoClose: 1500,
  draggable: true,
  pauseOnHover: true
});

class App extends Component {
  state = {
    isLogged: false
  }

  componentDidMount() {
    let loggedUser = localStorage.user;
    if(loggedUser) this.setState({ isLogged: true });
  }

  userLogged = (value) => {
    this.setState({ isLogged: value })
    // this.setState({ isLogged: !this.state.isLogged })
  }

  render() {
    return (
      <div>
        <Router>
          <NavBar isLogged={this.state.isLogged} userLogged={this.userLogged} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile" component={MyProfile} />
            <Route path="/post/:id" component={PostPage} />
            <Route path="/register" component={() => <Register userLogged={this.userLogged} />} />
            <Route path="/us" component={AboutUs} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
