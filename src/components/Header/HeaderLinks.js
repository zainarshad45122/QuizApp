/*eslint-disable*/
import React , { Component } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";
import {logoutUser} from "../../actions/authAction"
// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";
import { withRouter } from "react-router-dom";
// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";
import HeaderLink from "./HeaderLink";

class HeaderLinks extends Component {
  constructor() {
    super();
    this.onLogoutClick = this.onLogoutClick.bind(this);
  
  }
  onLogoutClick(e) {
    e.preventDefault();

    this.props.logoutUser();
    this.props.history.push("/login");
  }

  render() {
  
    const { auth} = this.props;
   
    return (
      <HeaderLink
      onLogoutClick={this.onLogoutClick}
      auth={auth}
      />
    );
  }
}

HeaderLinks.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});


export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(HeaderLinks));
