import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Box, Button, Container, Typography } from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <Container>
      <Box>
        <RegisterForm />
        <Box sx={({ 
          display: 'inline-block', borderBottom: '1px solid black', marginTop: '20px', paddingBottom: '3px',
          textAlign: 'center'
        })}>
          <Typography sx={({  })}>
            Already have an account?
          </Typography>
          <Button
            variant='contained'
            type="button"
            className="btn btn_asLink"
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
