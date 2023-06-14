import React, { useState } from 'react';

const Hack = ({ category, setCategory, hacks }) => {

  const { content, displayname, likes, dislikes } = hacks;

  // creates individual hack boxes

  return (
    <div className="aHack">
      <h2><p>{content}</p></h2><br />
      <p>Submitted by : <span className='displayname-hack'>{displayname}</span></p>
      <button id="like" className="voteBtn">
        Like
      </button>
      <span>{likes}</span>
      <button id="dislike" className="voteBtn">
        Dislike
      </button>
      <span>{dislikes}</span>
    </div>
  );
};

export default Hack;
