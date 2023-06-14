import React, { useState, useEffect } from 'react';
import HackCreator from './HackCreator';
import Hack from './Hack'

const MainDisplay = () => {
  const [hacks, setHack] = useState([]);
  const [category, setCategory] = useState('codesmith');

  // Event handler for main category dropdown //
  const handleChange = (event) => {
    // console.log('category has been changed');
    event.preventDefault();
    
    setCategory(event.target.value);
  };

  // after changing category, properly logs the category of the category
  // useEffect(() => {
  //   console.log('MainDisplay category from event target: ', category);
  // }, [category]);

  // GET request to SQL for specific category hacks //
  async function getHacks() {
    try {
      const response = await fetch(`/api/${category}`);
      // console.log('This is our response before we log data: ', response)
      const data = await response.json();
      // console.log('data from getHacks: ', data);
      setHack(data);
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
    hackItems.push(<Hack hacks={hacks[i]} />);
  }

  // console.log('hacks', hacks);
  // console.log('hackItems', hackItems);

  // Category Dropdown Component //
  const CatSelector = () => {
    return (
      <>
      <label>
        Choose a category:
        <select value={category} onChange={handleChange} className="categories">
          <option value="Categories">Categories</option>
          <option value="Codesmith">Codesmith</option>
          <option value="Time">Time</option>
          <option value="Money">Money</option>
        </select>
      </label>
      </>
    );
  };


  // Main Hack Display Container Component //
  return (
    <>
      <div className="catselector">
        <CatSelector />
      </div>
      <div className='hack-items-container'>{hackItems}</div>
    </>
  );
};

export default MainDisplay;
