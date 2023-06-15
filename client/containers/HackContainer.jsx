import React, { useEffect, useState } from 'react';
import Hack from '../components/Hack'

const HackContainer = ({ category, setCategory, hacks, setHacks }) => {
// Do we need to declare state in HackContainer in order to rerender once a hack is submitted?
// e.g. const [hacklist, setHacklist] = useState([])
// setHacklist(hacklist)

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

  // useEffect(() => {
    // if ()
  //   getHacks();
  // }, [hacks]);
  
  const hackItems = [];
  for (let i = 0; i < hacks.length; i++) {
    hackItems.push(<Hack hacks={hacks[i]} category={category} setCategory={setCategory}/>);
  }

  return (
    <div>
      {/* <Hack category={category} setCategory={setCategory} hacks={hacks} /> */}
      {hackItems}
    </div>
  );
};

export default HackContainer;