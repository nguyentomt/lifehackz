import React from 'react';
import Hack from '../components/Hack'

const HackContainer = ({ category, setCategory, hacks }) => {



  return (
    <div>
      <Hack category={category} setCategory={setCategory} hacks={hacks} />
    </div>
  );
};

export default HackContainer;