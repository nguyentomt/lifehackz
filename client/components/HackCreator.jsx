import React, { useState, useEffect } from 'react';
import HackContainer from '../containers/HackContainer';

const HackCreator = ({ user, category, setCategory, hacks, setHacks }) => {
  const [content, setContent] = useState('');
  // Maybe attach content to parent component and attach useEffect to this state?


  // Event handler for add new hack form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log('HackCreator -> handleFormSubmit -> `user` from props: ', user);
    const { displayname } = user;
    const postData = { category, content, displayname };
    const addHack = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    };
    fetch('/api', addHack)
      .then((response) => response.json())
      .then((postData) => {
        console.log(postData);
        getHacks();
      })
      .catch((err) => console.log('Error ', err));

      // const input = document.querySelector('.newHack');
      // input.value = ''; // <<<<<<======== COME BACK TO THIS
      setContent('');
  };

  const handleContentChange = (event) => setContent(event.target.value);

  async function getHacks() {
    try {
      const response = await fetch(`/api/${category}`);
      const data = await response.json();
      setHacks(data);
    } catch (err) {
    }
  }



  return (
    <div id="hackCreator">
      <form id="hackCreatorForm"onSubmit={handleFormSubmit}>
        <input
          className="newHack"
          name="newHack"
          type="text"
          value={content}
          onChange={handleContentChange}
          placeholder="Add new hack"
        />

        <label htmlFor="categories"></label>
        <select
          id="categories"
          name="categories"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="Codesmith">Codesmith</option>
          <option value="Money">Money</option>
          <option value="Time">Time</option>
        </select>
        <button type="submit">Add hack</button>
      </form>
    </div>
  );
};

export default HackCreator;
