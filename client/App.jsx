import React from "react";
// import { BrowserRouter as Router, Switch } from "react-router-dom";
import LoginContainer from "./containers/LoginContainer";
import HackCreator from "./components/HackCreator";
import MainDisplay from "./components/MainDisplay";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import { set } from "lodash";
import { Routes, Route } from "react-router-dom";


const App = () => {
  const [user, setUser] = useState({});

  // FOR GOOGLE OAUTH
  // async function handleCallbackResponse(response) {
  //   const userObject = jwtDecode(response.credential);
  //   const username = userObject.name;
  //   let googleuser;
  //   // Check if the user exists in the users table, he they do, set them to the current user
  //   googleuser = await fetch(`api/user/${username}`);
  //   const checkIfUserExists = await googleuser.json();
  //   if (checkIfUserExists.length > 0) {
  //     document.getElementById('signInDiv').hidden = true;
  //     setUser(checkIfUserExists[0]);
  //   }
  //   // Create a new user and set them to the current user
  //   else {
  //     const fetchProps = {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({name: username})
  //     };
  //     const responseFromCreatingUser = await fetch(`api/user/`, fetchProps);
  //     googleuser = await responseFromCreatingUser.json();
  //     document.getElementById('signInDiv').hidden = true;
  //     setUser(googleuser[0]);
  //   }
  // }
  // function handleSignOut(event) {
  //   setUser({});
  //   document.getElementById("signInDiv").hidden = false;
  // }
  // useEffect(() => {
  //   // These google objects came from a script tag which can be found in index.html
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id: '745677008135-28koou137ibajp5jnjalltuu1slpbsde.apps.googleusercontent.com',
  //     callback: handleCallbackResponse
  //   });
  //   google.accounts.id.renderButton(
  //     document.getElementById('signInDiv'),
  //     {theme: 'outline', size: 'large'}
  //   );
  //   google.accounts.id.prompt();
  // }, []);
  // END GOOGLE OAUTH

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
        console.log("App.jsx: makeUser: User from state: ", user);
        }
        // console.log("Successful signup!");
        // console.log("App.jsx: makeUser: Data from server", data);
        // setUser(data[0]);
      }
      else console.log("Error occured while trying to sign up.");
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
        }
      } else
        console.log('App.jsx: loginUser: Error occured while trying to log in.');
    } catch (error) {
      console.log(`Failed to log in: ${error}`);
    }
  }

  async function changeDisplayName(e) {
    console.log("clicked displayname");
    e.preventDefault();
    const input = document.getElementById("change-displayname");
    // console.log(input.value);
    const displayName = input.value;
    const fetchProps = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id, newDisplayName: displayName }),
    };
    const response = await fetch(`/api/user/`, fetchProps);
    const data = await response.json();
    console.log("Changed user: ", data[0]);
    setUser(data[0]);
    input.value = "";
  }

  // return (
  //   <Router>
  //     <h3>{user.displayname}</h3>
  //     <div id="signInDiv"></div>
  //     {Object.keys(user).length != 0 && (
  //       <>
  //         <button id="signOutBttn" onClick={(e) => handleSignOut(e)}>
  //           Sign Out
  //         </button>
  //         <input id="change-displayname" />
  //         <button id="change-displayname-bttn" onClick={changeDisplayName}>
  //           Change Display Name
  //         </button>
  //       </>
  //     )}

  //     {user && (
  //       <div>
  //         <img src={user.picture} />
  //         <h3>{user.name}</h3>
  //       </div>
  //     )}
  //     <Switch>
  //       <Route path="/">
  //         <Login makeUser={makeUser} loginUser={loginUser} />
  //       </Route>
  //     </Switch>
  //     <MainDisplay class="hack-items-container" />
  //     <HackCreator user={user} />
  //   </Router>
  // );
  return (
    <Routes>
      <Route path='/' element={<LoginContainer makeUser={makeUser} loginUser={loginUser} />} />
      {/* <Route path='/main' element={<MainContainer />} /> */}
    </Routes>
  );
};

export default App;
