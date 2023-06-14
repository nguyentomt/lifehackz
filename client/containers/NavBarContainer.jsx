import React from 'react';
import ChangeDisplayName from '../components/ChangeDisplayName'
import CatSelector from '../components/CatSelector';
import HackCreator from '../components/HackCreator';

const NavBarContainer = ({ user, setUser, category, setCategory, hacks, setHacks }) => {


  // Render ChangeDisplayName, CatSelector, HackCreator
  return (
    <div>
      <ChangeDisplayName user={user} setUser={setUser} />
      <CatSelector category={category} setCategory={setCategory} />
      <HackCreator category={category} setCategory={setCategory} />
    </div>
  );
};

export default NavBarContainer;