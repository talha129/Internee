import React, { Component } from 'react';
// import './customers.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg : '',
      len : '',
      searchResults : ''
    };  
    this.props = props;
    this.onBackHandler = this.onBackHandler.bind(this);
    this.onJobSearch  = this.onJobSearch.bind(this);
  }

  onBackHandler(){
    this.setState({signupState : false})
  }

  onJobSearch (ev) {
    ev.preventDefault();
    this.setState({msg : '', len : '', searchResults : ''})
    let reqBody = {
      jobSearch : ev.target.jobSearch.value
    };

    fetch("/Search", {
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
      }).then( (json) => {
          // validate from database
        //json.status  ? this.state.isLoggedIn =  true : this.state.isLoggedIn = false; 
          if(json.status === false){
            this.setState({msg : 'No results found'})
            return;
          }else{
              var res = (<div>{json.status.map((item, index) => (
                        <list>
                          <li>
                            <h4>Organization: </h4>{item['userName']}
                            <h4>Event: </h4>{item['eventName']}
                            <h4>Description: </h4>
                            {item['description']}
                          </li>
                        </list>
                    ))}
                   </div>)
              this.setState({searchResults : res, len : json.status.length})
          }

        })    
  }

  componentDidMount() {
    // fetch('/api/customers')
    //   .then(res => res.json())
    //   .then(customers => this.setState({customers}, () => console.log('Customers fetched...', customers)));
  }
  componentWillUnmount(){
    this.props.onBack();
  }
  render() {
 
      return(

            <div>

             <form onSubmit={this.onJobSearch}>  
            
              <input type="text" name="jobSearch" placeholder = "Search a Job" />
              
              <input type="submit" name = "Login" value= "Search"/>
            
             </form>
            {this.state.msg !== '' && <h4>{this.state.msg}</h4>}            
            {this.state.len !== '' &&
              <div>
                <h4>{`${this.state.len} results found`}</h4>
                {this.state.searchResults}
              </div>
            }
            </div>
        )
  }
}
        
          

export default Login;
