import React from 'react';
import { useState } from 'react';
import './authusername.css';
import { loginWithUsername, registerWithUsername } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthUsername = ({ title }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Add your login logic here
    if (title === "Login") {
      const id = toast.loading("Please wait...", { position: "top-center" })

      const res = await loginWithUsername(username, password);

      if (res.status === 200) {
        toast.update(id, { render: "Login successful", type: "success", isLoading: false, autoClose: 3000, position: "top-center", closeOnClick: true, });
        navigate('/home');
      }
      else {
        toast.update(id, { render: res.data, type: "error", isLoading: false, autoClose: 30000, position: "top-center", closeOnClick: true, });
      }

      console.log("click Login with username ", res);
    }
    else {

      const id = toast.loading("Please wait...", { position: "top-center" })
      const res = await registerWithUsername(username, password);
      if (res.status === 200) {
        toast.update(id, { render: "User created successfully , redirecting to Login page", type: "success", isLoading: false, autoClose: 5000, position: "top-center", closeOnClick: true, });
        
      }
      else {
        toast.update(id, { render: res.data, type: "error", isLoading: false, autoClose: 30000, position: "top-center", closeOnClick: true, });
      }

      setTimeout(() => {
        navigate('/login');
      }, 4500)

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