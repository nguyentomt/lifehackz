import React, { useEffect, useState } from 'react';
import Hack from '../components/Hack'

const HackContainer = ({ category, setCategory, hacks, setHacks }) => {

  async function getHacks() {
    try {
      const response = await fetch(`/api/${category}`);
      const data = await response.json();
      setHacks(data);
    } catch (err) {
      // console.log('getHacks error! ', err);
    }
  }

  // Trigger for page rerender once Category change is detected. //
  useEffect(() => {
    getHacks();
  }, [category]);

  
  const hackItems = [];
  for (let i = 0; i < hacks.length; i++) {
    hackItems.push(<Hack key={i} hacks={hacks[i]} setHacks={setHacks} category={category} setCategory={setCategory}/>);
  }

  return (
    <div className='hack-items-container'>
      {/* <Hack category={category} setCategory={setCategory} hacks={hacks} /> */}
      {hackItems}
    </div>
  );
};

export default HackContainer;