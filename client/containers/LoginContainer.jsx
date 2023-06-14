import React from 'react';
import Login from '../components/Login.jsx';

const LoginContainer = ({ makeUser, loginUser }) => {
  return (
    <div>
      <Login makeUser={makeUser} loginUser={loginUser} />
    </div>
  );
};


export default LoginContainer;