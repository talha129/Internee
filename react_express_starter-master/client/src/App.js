import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './signup/signup';
import Login from './login/login';
import Customers from './components/customers';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// import { StackNavigator } from 'react-navigation';

var request = require('request')

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false};
  }

  

  render() {
    if ((this.state.isLoggedIn) === false){
         return(
    // <ul>
        //   <li>
        //     <Link to="/">Home</Link>
        //   </li>
        //   <li>
        //     <Link to="/about">About</Link>
        //   </li>
        //   <li>
        //     <Link to="/topics">Topics</Link>
        //   </li>
        // </ul>          
    <Router>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/Login" component={Login} />
      </div>
    </Router>
          );
    }
    else
      return(<Customers/>);
  }
}


export default App;
