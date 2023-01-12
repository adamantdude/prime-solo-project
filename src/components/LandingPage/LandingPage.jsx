import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import { Box, Container } from '@mui/system';
import { Button, Typography } from '@mui/material';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to Fableguild!');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <Container>
      <Typography fontSize={'28px'} fontWeight={'Bold'} component={'header'}>{heading}</Typography>

      <Box sx={({ 'display':'grid' })}>
        <Box sx={({ 'flexBasis':'50%', 'maxWidth':'50%' })}>
          <Typography paragraph>
            A fantasy-based messaging app that is designed for
            the roleplay-inclined. Come share in adventures or merely chat with others
            about those adventures. Practice your roleplaying skills to dive into a new
            world!
          </Typography>
        </Box>

        <Box sx={({ 'flexBasis':'33.3333%', 'maxWidth':'33.3333%' })}>
          <RegisterForm />

          <Box sx={({ 'alignItems':'center' })}>
            <Typography fontWeight={'Bold'}>
              Already a member?
            </Typography>
            <Button variant='contained' className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default LandingPage;
