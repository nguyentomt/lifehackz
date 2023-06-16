import React from 'react';

const CatSelector = ({ category, setCategory }) => {
  // Input some functionality to allow you to select a category to view relevant hacks
  const handleChange = (event) => {
    // console.log('category has been changed');
    event.preventDefault();
    
    setCategory(event.target.value);
  };


  return (
    <div className='catSelector'>
      <label>
        {/* Choose a category: */}
        <select value={category} onChange={handleChange} className="categories">
          <option value="" disabled selected>Choose Category</option>
          <option value="Codesmith">Codesmith</option>
          <option value="Time">Time</option>
          <option value="Money">Money</option>
        </select>
      </label>
    </div>
  );
};

export default CatSelector;

