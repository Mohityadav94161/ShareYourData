import React from 'react';
import PropTypes from 'prop-types';
import AuthPage from './AuthPage';

const LoginPage = props => {
  return (
    <div className='login-page-style' style={{minHeight:'85vh'}}>
        <AuthPage title = "Login"/>
    </div>
  )
}

LoginPage.propTypes = {}

export default LoginPage