// LoginPageTabs.js
import React, { useState } from 'react';
import './authpage.css';
import AuthPhoneNumber from '../components/Authentication Components/AuthPhoneNumber';
import AuthUsername from '../components/Authentication Components/AuthUsername';


const AuthPage = ({ title }) => {
  const [activeTab, setActiveTab] = useState('phone');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
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
  );
};

export default AuthPage;
