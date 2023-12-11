import React from 'react';
import { useState } from 'react';
import './authusername.css';
import { loginWithUsername, registerWithUsername } from '../../services/api';

const AuthUsername = ({title})=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Add your login logic here
    if(title === "Login") {
      const res = loginWithUsername(username, password);
      console.log("click Login with username ",res);
    }
    else{
      const res = registerWithUsername(username,password);
      console.log("click register with username ", res);
    }

    console.log('Logging in with:', { username, password });
  };
  return (
    <div className="login-container">
      <div className="login-form">
        
        <label className="username label-authUser">Username:</label>
        <input
          className='input'
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="password label-authUser">Password:</label>
        <input
        className='input'
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='authUser-btn' onClick={handleLogin}>{title}</button>
      </div>
    </div>
  )
  
}



export default AuthUsername;