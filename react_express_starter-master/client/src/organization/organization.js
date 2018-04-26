import React, { Component } from 'react';
// import './customers.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg : '',
      userName : props.userName,
      status : props.stat,
      name : '',
      desc : '',
      err : '',
      searchFlag : false,
      searchResults : '',
      len : 0
    };
    this.props = props;
    this.onBackHandler = this.onBackHandler.bind(this);
    this.onVolunteerSearch  = this.onVolunteerSearch.bind(this);
    this.onPost  = this.onPost.bind(this);
  }

  onBackHandler(){
    this.setState({signupState : false})
  }

  onPost (ev) {
    ev.preventDefault();
    if (ev.target.eventName.value === '' || ev.target.eventDesc.value === ''){
      this.setState({err : 'Some fields are missing'})
      return;
    }
    this.setState({err : ''})
    this.setState({searchFlag : false})
    let reqBody = {
      userName : this.state.userName,
      eventName : ev.target.eventName.value,
      description : ev.target.eventDesc.value
    };

    fetch("/PostEvent", {
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
          // if(json.status === false){
          //   this.setState({msg : 'No results found'})
          //   return;
          // }else{
          //   this.setState({msg : `{json.status.length} results found`})
          //   console.log(json.status[0])
          // }
          this.setState({name : reqBody.eventName, desc : reqBody.description});



        })    
  }

  onVolunteerSearch (ev){

    ev.preventDefault();
    this.setState({err : '', name : ''})  
    let reqBody = {
        searchVolunteer : ev.target.volunteerSearch.value,
        userName : this.state.userName
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
            this.setState({err : 'No results found'})
          }else{
              this.setState({searchFlag : true})
              var res = (<div>{json.status.map((item, index) => (
                        <list>
                          <li>{item['userName']}</li>
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
    if(this.props.onBack !== undefined){
      this.props.onBack()
    }
  }
  render() {
 
      return(

            <div>
              <form onSubmit={this.onVolunteerSearch}>  
            
              
              <input type="text" name="volunteerSearch"  placeholder = "Search a Volueer for your event"/>
              
              <input type="submit" name = "search" value= "Search"/>
            
             </form>

             <form onSubmit={this.onPost}>  
            
              <input type="text" name='eventName'  placeholder = "Event Name"/>
              <input type="text" name="eventDesc" placeholder = "Event description" />
              
              <input type="submit" name = "post" value= "Post Event"/>
            
             </form>
              {this.state.err !== '' && <h4>{this.state.err}</h4>}
              {this.state.name !== '' && 
                <div>
                <h3>{this.state.name} </h3>
                <p>{this.state.desc}</p>
                </div>
              }
              {this.state.searchFlag &&
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
