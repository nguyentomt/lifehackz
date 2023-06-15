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
