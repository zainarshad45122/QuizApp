import React, { Component } from "react";
import ProfilePage from './ProfilePage'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSellerProfile } from "../../actions/providerAction";






class Profile extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      secret:"",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentDidMount(){
      if(  !this.props.auth.isAuthenticated)
      {
        this.props.history.push("/");
      }
     
      else{
        this.props.getSellerProfile();
      }
 
   
    
  }
  

  onSubmit(e) {
    e.preventDefault();
    if((this.state.password==="" && this.state.email==="") 
    || (this.state.password==="" || this.state.email===""))
    {
      this.setState({ errors :{message :' Please enter both fields'} });
    }
    else{
      const userData = {
       
        email: this.state.email,
        password: this.state.password,
      
      };
  
      this.props.loginUser(userData);
    }
    
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
 
  render() {
    
    console.log(this.state);
    const { profile } = this.props.seller;
   console.log("Profile" + profile);
    let profileContent;
    if (profile == "abc" || profile == undefined) {
      profileContent = (
        <span></span>
      );
    } else {
      profileContent = (
        <ProfilePage
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        auth={this.props.auth}
        seller= {{ ...this.props.seller }}
          
        />
      );
    }
    
    return (
      <span>
          {profileContent}
      </span>
      );
  }
}



Profile.propTypes = {
    getSellerProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
    seller: state.seller
  });
  
  export default connect(
    mapStateToProps,
    { getSellerProfile}
  )(Profile);
  
