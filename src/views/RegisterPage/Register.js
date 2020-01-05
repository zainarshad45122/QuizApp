import React, { Component } from "react";
import RegisterPage from './RegisterPage'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authAction";




class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      phoneno:"",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  componentDidMount(){
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    else {
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
      this.setState({ errors: nextProps.errors.errors });
    }
  }
  
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phoneno:this.state.phoneno,
      email: this.state.email,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
    };

    this.props.registerUser(newUser, this.props.history);
  }
  render() {
    
    console.log(this.state);
    const { errors } = this.state;
    return (
      <RegisterPage 
      onSubmit={this.onSubmit}
      onChange={this.onChange}
      errors={errors}
      />
      );
  }
}


Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
  
