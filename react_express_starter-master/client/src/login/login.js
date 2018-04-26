import React, { Component } from 'react';
// import './customers.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signup from '../signup/signup';
import volunteer from '../volunteer/volunteer';
import organization from '../organization/organization';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn : false,
      signupState : false,
      msg : '',
      next : '',
      userName : ''

    };
    this.props = props;
    this.login = this.login.bind(this);
    this.onSignupClick  = this.onSignupClick.bind(this);
    this.onMain = this.onMain.bind(this);
    this.onBackHandler = this.onBackHandler.bind(this)
  }

  onSignupClick () {
    this.setState({signupState : true});
  }

  onMain(){
    this.setState({signupState : true})
  }
  onBackHandler(){
    this.setState({isLoggedIn : false, signupState : false, msg : '', next : ''});
  }

  login (ev){

    ev.preventDefault();
    let reqBody = {
      userName: ev.target.userName.value,
      password: ev.target.password.value,
    };
    console.log(reqBody.userName)
    fetch("/login", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
                "Content-Type": "application/json"
            }  
    })
      .then((res) => {
        if (res.ok){
          return res.json();
        } else {
          // throw new Error ('Something went wrong with your fetch');
          console.log("Error")
        }
      }).then((json) => {
          // validate from database
        //json.status  ? this.state.isLoggedIn =  true : this.state.isLoggedIn = false; 
        if (json.status === false){
          this.setState({msg : 'incorrect username or password'})
          return
        }

        this.setState({isLoggedIn : true});
        this.setState({signupState : true});
        this.setState({userName : json.userName})
        json.status === 'Volunteer' ? this.setState({status : 'Volunteer', next : volunteer})  : this.setState({status : 'Organization', next : organization})
        
        document.getElementById(json.status).click();

      })

        
  }

  componentDidMount() {
    this.setState({signupState : false})
    // fetch('/api/customers')
    //   .then(res => res.json())
    //   .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }
  
  componentWillUnmount(){
    if(this.props.onBack !== undefined){
      this.props.onBack()
    }
  }

  render() {
            
        // {this.state.isLoggedIn ? 
        //   //<Route path = "/main" component = {main}/>
        // }
    return (
      <Router>      
        <div>
  
        {this.state.signupState == false &&
          <div>
          <form onSubmit =  {this.login}>  
            {this.state.msg }<br/>
            <label htmlFor = "userName">User name:</label>
            <input type="text" name="userName" />
            <br/>   
            <label htmlFor = "psw">Password:</label>
            <input type="Password" name="password"/>
            <br/>
            <input type="submit" name = "Login" value= "Login"/>
          </form>
          Need an account? <Link to="/signup" onClick={this.onSignupClick}>Signup</Link>
          </div>
        }
        <Link to = '/main' id = {this.state.status}></Link>
        <Route path = "/main" render={()=><this.state.next onBack={this.onBackHandler} stat={this.state.status} userName={this.state.userName}/>}/> 
        <Route path = "/signup" render={()=><Signup onBack={this.onBackHandler}/>}/>
        </div>
      </Router>

    );
  }
}

// const loginComp = () => (
        
// const vol = <Link to = '/main' id = 'VolunteerMain'></Link>
// const org = <Link to = '/main' id = 'OrganizationMain' onClick={Login.onMain}></Link>
export default Login;
