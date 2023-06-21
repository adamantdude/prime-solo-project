import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Box, Button, Container, Typography } from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <Container>
      <Box sx={({ textAlign: 'center' })}>
        <RegisterForm />
        <Box sx={({ 
          display: 'inline-flex', borderBottom: '1px solid black', marginTop: '20px',
          paddingBottom: '3px', alignItems: 'center'
        })}>
          <Typography sx={({ mr: '10px' })}>
            Already have an account?
          </Typography>
          <Button
            onClick={() => {
              history.push('/login');
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default RegisterPage;
