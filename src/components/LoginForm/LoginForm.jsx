import { Box, Button, Input, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Box>
      <Typography variant='h4'>Login</Typography>
      <Box sx={({ display: 'inline-flex' })}>
        {errors.loginMessage && (
          <Typography className="alert" role="alert">
            {errors.loginMessage}
          </Typography>
        )}
      </Box>
      <Box sx={{ m: '10px' }} component={'form'}>
          <TextField
            label="Username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Box sx={{ m: '5px' }}>
          </Box>
          <TextField
            label="Password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
      </Box>
      <Box>
        <Button variant='contained' onClick={login}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
}

export default LoginForm;
