import React, { Component } from "react";
import LoginPage from './LoginPage'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authAction";





class Login extends Component {
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
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    else{
      window.scrollTo(0, 0);
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
  UNSAFE_componentWillReceiveProps(nextProps) {
   
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    
    console.log(this.state);
  
    return (
      <LoginPage 
      onSubmit={this.onSubmit}
      onChange={this.onChange}
      errors={this.state.errors}
      />
      );
  }
}



Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { loginUser}
  )(Login);
  
