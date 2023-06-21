import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import { Box, Button, Container } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <Container>
      <Box sx={({ textAlign:' center' })}
      >
        <LoginForm />

          <Button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
