import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import jwtDecode from "jwt-decode";


const Login = ({ setUser }) => {
    const navigate = useNavigate();

    async function makeUser(e) {
        try {
          e.preventDefault();
          const username = document.getElementById("signup-username").value;
          let password = document.getElementById("signup-password").value;
          
          if (password.length < 4) {
            alert('Password should be 4-50 characters long');
            password = '';
            return;
          }

          const fetchProps = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          };
          const response = await fetch("/api/user", fetchProps);
          if (response.ok) {
            const data = await response.json();
            console.log('App.jsx: makeUser: data from server: ', data);
            setUser(data[0]);
            console.log('Successful signup!');
            navigate('/main');
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

//////////////////////
// FOR GOOGLE OAUTH //
  async function handleCallbackResponse(response) {
    const userObject = jwtDecode(response.credential);
    const username = userObject.name;
    let googleUser;

    const fetchProps = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, password: ""})
    };
    // Check if the user exists in the users table, if they do, set them to the current user
    googleUser = await fetch(`/api/user/${username}`, fetchProps);
    console.log('Login: handleCallbackResponse: googleUser response from database: ', googleUser);
      const checkIfUserExists = await googleUser.json();
      console.log('Login: handleCallbackResponse: does user exist in database?: ', checkIfUserExists);
      
      if (checkIfUserExists.length > 0) {
        console.log('Login -> handleCallbackResponse -> Entering line 83 if statement');
        document.getElementById('oauthBtn').hidden = true;
        setUser(checkIfUserExists[0]);
        navigate('/main');
      } else {
      const responseFromCreatingUser = await fetch(`/api/user/`, fetchProps);
      googleUser = await responseFromCreatingUser.json();
      console.log('Google User comes back as: ', googleUser)
      document.getElementById('oauthBtn').hidden = true;
      setUser(googleUser[0]);
      navigate('/main');
      }

  }

  function handleSignOut(event) {
    setUser({});
    document.getElementById("oauthBtn").hidden = false;
  }
  
  useEffect(() => {
    // These google objects came from a script tag which can be found in index.html
    /* global google */
    google.accounts.id.initialize({
      client_id: '745677008135-28koou137ibajp5jnjalltuu1slpbsde.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById('oauthBtn'),
      {theme: 'outline', size: 'large'}
    );
    // google.accounts.id.prompt();
  }, []);
  ////////////////////////////////////// END GOOGLE OAUTH //////////////////////////////////


  return (
     <div id='loginSignup'>
        <h1>LifeHx</h1>
        <div className='userInfo'>
            <form id="login" method='POST' action='/login'>
                <input id='login-username'className="username" name="username" type="text" placeholder="Username"></input>
                <input id='login-password' name="password" type="password" placeholder='Password'></input>
                <input className="button" type="submit" value="Log in" onClick={loginUser}></input>
            </form>
        </div>
        <div className='userInfo'>
            <form method='POST' action='/signup'>
                <input id='signup-username' name="username" type="text" placeholder="Username"></input>
                <input id='signup-password' name="password" type="password" placeholder="Password" pattern=".{4,50}" required></input>
                <input className="button" type="submit" value="Sign up" onClick={makeUser}></input>
            </form>  
        </div>
        <div id="googleBtn">
          <div id="oauthBtn"></div>
        </div>
    </div>
  )
}

export default Login;
