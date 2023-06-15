import React, { useEffect, useState } from "react";
import LoginContainer from "./containers/LoginContainer";
import HackCreator from "./components/HackCreator";
import MainContainer from "./containers/MainContainer";
import jwtDecode from "jwt-decode";
import { set } from "lodash";
import { Routes, Route, useNavigate } from "react-router-dom";

const App = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

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
      <Route path='/' element={<LoginContainer setUser={setUser} />} />
      <Route path='/main' element={<MainContainer user={user} setUser={setUser} />} />
    </Routes>
  );
};

export default App;
