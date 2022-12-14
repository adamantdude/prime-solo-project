import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [
    [username, setUsername],
    [password, setPassword],
    [charName, setName] 
  ] = [useState(''), useState(''), useState('')];
  
  const errors = useSelector(store => store.errors);

  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        charName: charName,
      },
    });
  }; // end registerUser

  const autofill = () => {
    setUsername('TheGoblinSlayer');
    setPassword('GoblinSlayer');
    setName('Marn Orcbolg');
  }

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <h2 onClick={autofill}>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="character_first_name">
          Character's Name:
          <input
            type="text"
            name="char_fname"
            value={charName}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
