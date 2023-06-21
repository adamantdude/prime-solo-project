import { Button, Grid, InputLabel, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
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

  const registerUser = () => {
    if(!username || !password || !charName) return;

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        charName: charName,
      },
    });
  }; // end registerUser

  return (
    <Container sx={({ display:'flex', flexDirection:'column', alignItems:'center' })}>
      <Typography fontWeight={'Bold'} fontSize={'20px'}>Register User</Typography>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <Box>
        <TextField
          label={'Username'}
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
          sx={({ margin: '5px' })}
        ></TextField>
        <TextField
          label={'Password'}
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
          sx={({ margin: '5px' })}
        ></TextField>
        <TextField
          label={'Character Name'}
          value={charName}
          required
          onChange={(e) => setName(e.target.value)}
          sx={({ margin: '5px' })}
        ></TextField>
      </Box>
      <Box>
        <Button variant='contained' onClick={() => registerUser()}>Register</Button>
      </Box>
    </Container>
  );
}

export default RegisterForm;
