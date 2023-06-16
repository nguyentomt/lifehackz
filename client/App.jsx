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


  return (
    <Routes>
      <Route path='/' element={<LoginContainer setUser={setUser} />} />
      <Route path='/main' element={<MainContainer user={user} setUser={setUser} />} />
    </Routes>
  );
};

export default App;
