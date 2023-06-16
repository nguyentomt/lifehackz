import React from 'react';
import ChangeDisplayName from '../components/ChangeDisplayName'
import CatSelector from '../components/CatSelector';
import HackCreator from '../components/HackCreator';

const NavBarContainer = ({ user, setUser, category, setCategory, hacks, setHacks }) => {


  // Render ChangeDisplayName, CatSelector, HackCreator
  return (
    <div id='navBarContainer'>
      <h1>{user.username}</h1>
      {/* <ChangeDisplayName user={user} setUser={setUser} /> */}
      <CatSelector category={category} setCategory={setCategory} />
      <HackCreator user={user} category={category} setCategory={setCategory} hacks={hacks} setHacks={setHacks} />
    </div>
  );
}

export default NavBarContainer;