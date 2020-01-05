import axios from "axios";

import { GET_ERRORS} from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { SET_CURRENT_USER } from "../actions/types";


// Register User
export const registerUser = (userData, history) => dispatch => {
    axios
      .post("http://127.0.0.1:8000/api/register", userData)
      .then(res => history.push("/login"))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };

// Login - Get User Token
export const loginUser = (userData,history) => dispatch => {
  console.log("Login User");
    axios
      .post("http://127.0.0.1:8000/api/login", userData)
      .then(res => {
        // Save to localStorage
  
        const token = "Bearer" + " " + res.data.token;
        console.log(token);
        // Set token to ls
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        console.log(jwt_decode(token));
        // Set current user
        axios
          .get("http://127.0.0.1:8000/api/user")
          .then(res => {
            dispatch(setCurrentUser(res.data));
            
            localStorage.setItem("data", JSON.stringify(res.data));
            window.location.href = '/';
          },
          
          )
          .catch(err => console.log(err));
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  };


  export const setCurrentUser = decoded => {
    console.log(decoded);
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };
  
  export const logoutUser = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));

    
  };
  