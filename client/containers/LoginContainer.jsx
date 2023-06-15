import React from 'react';
import Login from '../components/Login.jsx';

const LoginContainer = ({ setUser }) => {


  
  return (
    <div>
      <Login setUser={setUser} />
    </div>
  );
};


export default LoginContainer;