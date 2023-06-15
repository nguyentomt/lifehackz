import React from 'react';
import { useNavigate } from 'react-router';

const Login = ({ setUser }) => {
    const navigate = useNavigate();

    async function makeUser(e) {
        try {
          e.preventDefault();
          const username = document.getElementById("signup-username").value;
          const password = document.getElementById("signup-password").value;
          
          const fetchProps = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          };
          const response = await fetch("/api/user", fetchProps);
          if (response.ok) {
            const data = await response.json();
            if (data.length === 0) {
              alert("Password should be 4-50 characters");
              // setUser({displayname: "Wrong username or password"});
            } else {
            console.log('App.jsx: makeUser: data from server: ', data);
            setUser(data[0]);
            console.log('Successful signup!');
            navigate('/main');
            }
            // console.log("Successful signup!");
            // console.log("App.jsx: makeUser: Data from server", data);
            // setUser(data[0]);
          }
          else console.log("Error occurred while trying to sign up.");
        } catch (error) {
          console.log("App.jsx: makeUser: Error signing up: ", error);
        }
      }
    
      async function loginUser(e) {
        try {
          e.preventDefault();
          const username = document.getElementById("login-username").value;
          const password = document.getElementById("login-password").value;
          // const response = await fetch(`/api/user/${username, password}`);
          const postData = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          };
          const response = await fetch(`/api/user/${username}`, postData);
          if (response.ok) {
            const data = await response.json();
            if (data.length === 0) {
              alert("WRONG!");
              // setUser({displayname: "Wrong username or password"});
            } else {
            console.log('App.jsx: loginUser: data from server: ', data);
            setUser(data[0]);
            console.log('Successful login!');
            navigate('/main');
            }
          } else
            console.log('App.jsx: loginUser: Error occured while trying to log in.');
        } catch (error) {
          console.log(`Failed to log in: ${error}`);
        }
      }

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
