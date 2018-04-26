import React, { Component } from 'react';
// import './customers.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from '../login/login';
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      choose : 'Volunteer',
      password : '',
      Passmsg : '',
      emailMsg : '',
      SignupDone : false,
    };
    this.props = props;
    this.onBackHandler = this.onBackHandler.bind(this);
    this.selectHandler = this.selectHandler.bind(this)
    this.SignupHandler = this.SignupHandler.bind(this)
    this.passwordHandler = this.passwordHandler.bind(this)
    this.ConfirmpasswordHandler = this.ConfirmpasswordHandler.bind(this)
  };

  onBackHandler(){
    this.setState({signupDone : false})
  }

  selectHandler(ev){
    this.setState({choose : ev.target.value})
  }

  SignupHandler(ev) {
    ev.preventDefault();
    if(!(ev.target.email.value.indexOf('@') > -1)){
      console.log(ev.target.password.value)
      this.setState({emailMsg : 'email is not Valid'});
    }
    else
      this.setState({ emailMsg : ''})

    
    if(ev.target.password.value != ev.target.confirmPassword.value){
      this.setState({ msg : 'Password does not match'})
    }
    else
      this.setState({msg : ''})

    if (this.state.msg !== '' || this.state.emailMsg !== '')
        {
          return
        }


    let reqBody = {
      userName: ev.target.userName.value,
      password: ev.target.password.value,
      email : ev.target.email.value,
      status : this.state.choose
    };
    console.log(reqBody)
    fetch("/Signup", {
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
        this.setState({SignupDone : true})
        document.getElementById('Login').click();

      })

  }

  passwordHandler(ev) {
    ev.preventDefault()
    this.setState({password : ev.target.value})
  }

  ConfirmpasswordHandler(ev) {
    ev.preventDefault()
    this.state.password != ev.target.value ?
      this.setState({msg : 'Password does not match'})
    :
    this.setState({msg : ''})
  }

  componentDidMount() {
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
    return (
      
      <Router>
      <div>
        {link}
        { !this.state.SignupDone &&
          
          <div>
            <h2> Signup PAGE</h2>
            <label htmlFor = "SignupAs">Signup as :</label>
            <select onChange={this.selectHandler}>
              <option value="Volunteer">Volunteer</option>
              <option value="Organization">Organization</option>
            </select>

            <form onSubmit =  {this.SignupHandler}>  
              <label htmlFor = "username">Username:</label>
              <input type="text" name="userName" />
              <br/>   
              
              <label htmlFor = "Email">Email:</label>
              <input type="text" name="email"/>
              {this.state.emailMsg}
              <br/>
              
              <label htmlFor = "password">Password:</label>
              <input type="password" name="password" />
              <br/>   
              
              <label htmlFor = "confirmPassword">Confirm Password:</label>
              <input type="Password" name="confirmPassword" />
              {this.state.msg}
              <br/>
              
              <input type="submit" name = "Signp" value= "Signup"/>
            </form>
          </div>
         }  
          <Route path = "/Login" render={()=><Login onBack={this.onBackHandler}/>}/>      

        

      </div>
      </Router>
    );
  }
}

const link = <Link to = '/Login' id = 'Login'></Link>
export default Signup;
