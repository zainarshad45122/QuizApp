import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authAction";
import "assets/scss/material-kit-react.scss?v=1.8.0";
import "assets/scss/material-kit-react.scss?v=1.8.0";
import PrivateRoute from "./components/common/PrivateRoute";
// pages for this product
import Components from "views/Components/Components.js";
import Quiz from "views/Quiz/Quiz"
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import LoginPage from "views/LoginPage/Login.js";
import RegisterPage from "views/RegisterPage/Register.js";
import SellerRegister from "views/SellerRegistration/SellerRegister";
import Profile from "views/ProfilePage/Profile";
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);

  var user = JSON.parse(localStorage.getItem("data"));
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(user));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile

    // Redirect to login
    window.location.href = "/login";
  }
}

var hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
  <Router history={hist}>
    <Switch>
     
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/quiz" component={Quiz} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/register" component={RegisterPage} />
      <Route exact path="/register/seller" component={SellerRegister} />
      <Route exact path="/" component={LandingPage} />
    </Switch>
  </Router>,
  </Provider>,
  document.getElementById("root")
);
