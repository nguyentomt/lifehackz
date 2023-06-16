import React, { useState } from 'react';

const Hack = ({ category, setCategory, hacks, setHacks }) => {

  const { _id, content, displayname, likes, dislikes } = hacks;

  // const [] = useState(likes);
  // console.log('Hack.jsx Hacks is:', hacks);

  // creates individual hack boxes

/**
 * Both buttons need an onClick -> buttonHandler, one for each
 * in each handler:
 *  getElementById for like/dislike
 *  patch request
 */

  async function likeButtonHandler(e) {

    try {
      e.preventDefault();
      const updateLike = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes, _id }),
      };

      const response = await fetch('/api/likes', updateLike);

      if (response.ok) {
        const data = await response.json();
        console.log('WE ARE INSIDE LIKEBUTTONHANDER FETCH!!! data: ', data);
        getHacks();
      }
      else console.log('Error sending data from likeButtonHandler');
    }
    catch (err) {
      console.log('Error: ', err)
    }

  };

  async function dislikeButtonHandler(e) {

    try {
      e.preventDefault();
      const updateDislike = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dislikes, _id }),
      };

      const response = await fetch('/api/dislikes', updateDislike);

      if (response.ok) {
        const data = await response.json();
        console.log('WE ARE INSIDE DISLIKEBUTTONHANDER FETCH!!! data: ', data);
        getHacks();
      }
      else console.log('Error sending data from dislikeButtonHandler');
    }
    catch (err) {
      console.log('Error: ', err)
    }

  };

  

  async function getHacks() {
    try {
      const response = await fetch(`/api/${category}`);
      const data = await response.json();
      setHacks(data);
    } catch (err) {
    }
  }

  return (
    <div className="hackCard">
      <h2><p>{content}</p></h2><br />
      <p>Submitted by : <span className='displayname-hack'>{displayname}</span></p>
      <div id='likeAndDislike'>
        <button id="like" className="voteBtn" onClick={likeButtonHandler}>
          Like
        </button>
        <span>{likes}</span>
        <button id="dislike" className="voteBtn" onClick={dislikeButtonHandler}>
          Dislike
        </button>
        <span>{dislikes}</span>
      </div>
    </div>
  );
};

export default Hack;
