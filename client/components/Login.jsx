import React from 'react'

const Login = ({ makeUser, loginUser }) => {



  return (
     <div className="logins">
        <div>
            <form method='POST' action='/login'>
                <input id='login-username'className="username" name="username" type="text" placeholder="Username"></input>
                <input id='login-password' name="password" type="password" placeholder='Password'></input>
                <input className="button" type="submit" value="Log in" onClick={loginUser}></input>
            </form>
        </div>
        <div>
            <form method='POST' action='/signup'>
                <input id='signup-username' name="username" type="text" placeholder="Username"></input>
                <input id='signup-password' name="password" type="password" placeholder="Password" pattern=".{4,50}" required></input>
                <input className="button" type="submit" value="Create Account" onClick={makeUser}></input>
            </form>
        </div>
    </div>
  )
}

export default Login;
