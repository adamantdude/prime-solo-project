import React from 'react';
import './UserPage.css';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const character = useSelector(store => store.profile.character);

  return (
    <div className="container" id="userPage">
      <h2>Welcome to the Guild, {character.full_name}!</h2>
      <h3>What adventures await you today?</h3>
      <div>LEVEL: {character.level}</div>
      <div>EXP: {character.exp}</div>
      <h2>--- Current News ---</h2>
      <p>
        There seems to be a lingering unrest at the Capitol city ...
        <br></br>
        The people whisper and the market has quieted to many's concerns.
        <br></br>
        What plot is to be uncovered at this location?
      </p>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
