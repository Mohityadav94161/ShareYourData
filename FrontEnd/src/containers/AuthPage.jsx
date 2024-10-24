// LoginPageTabs.js
import React, { useState } from 'react';
import './authpage.css';
import PropTypes from 'prop-types';
import AuthPhoneNumber from '../components/Authentication Components/AuthPhoneNumber';
import AuthUsername from '../components/Authentication Components/AuthUsername';
import { Navbar } from '../components/footer and Headers/Navbar';


const AuthPage = ({ title }) => {
  const [activeTab, setActiveTab] = useState('phone');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    < div style={{ minHeight: '100vh' }}>
      <Navbar />
      <div className="login-page-tabs">
        <h2>{title}</h2>
        <div className="tab-header">
          <div
            className={`tab-item ${activeTab === 'phone' ? 'active' : ''}`}
            onClick={() => handleTabChange('phone')}
          >
            Mobile Number
          </div>
          <div
            className={`tab-item ${activeTab === 'username' ? 'active' : ''}`}
            onClick={() => handleTabChange('username')}
          >
            Username
          </div>
        </div>
        <div className="tab-content">
          {activeTab === 'phone' ? <AuthPhoneNumber title={title} /> : null}
          {activeTab === 'username' ? <AuthUsername title={title} /> : null}
        </div>
      </div>
    </div>
  );
};

AuthPage.propTypes = {
  title: PropTypes.string.isRequired,
};

const LoginPage = () => {
  return (
    <div className='login-page-style' style={{ minHeight: '85vh' }}>
      <AuthPage title="Login" />
    </div>
  );
};

const Register = () => {
  return (
    <div>
      <AuthPage title="Register" style={{ minHeight: '85vh' }} />
    </div>
  );
};

export { LoginPage, Register };
export default AuthPage;
