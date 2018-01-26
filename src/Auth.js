import React from 'react';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';

const Auth = () => {
  return(
    <div className="auth_div">
      <Login />
      <Register />
      <Logout />
    </div>
  )
}

export default Auth;
