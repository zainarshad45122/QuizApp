import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ProfileRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      (auth.isChef === true || auth.isCustomer===true || auth.isDriver ===true) ? (
        <Component {...props} />
      ) : (
        <Redirect to="/register/customer" />
      )
    }
  />
);

ProfileRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProfileRoute);
