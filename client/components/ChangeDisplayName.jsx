import React from 'react';

const ChangeDisplayName = ({ user, setUser }) => {

  async function changeDisplayName(e) {
    console.log("clicked displayname");
    e.preventDefault();
    const input = document.getElementById("change-displayname");
    // console.log(input.value);
    const displayName = input.value;
    const fetchProps = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: user.id, newDisplayName: displayName }),
    };
    const response = await fetch(`/api/user/`, fetchProps);
    const data = await response.json();
    console.log("Changed user: ", data[0]);
    setUser(data[0]);
    input.value = "";
  }
  
  return (
    <div id="changeDisplayName">
      <input id="change-displayname-input" placeholder='New display name'/>
      <button id="change-displayname-btn" onClick={changeDisplayName}>
        Change Display Name
      </button>
    </div>
  );
};

export default ChangeDisplayName;