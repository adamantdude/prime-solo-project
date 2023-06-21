import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import { Box, Container } from '@mui/system';
import { Button, Grid, Typography } from '@mui/material';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome to Fableguild!');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <Container>
      <Typography fontSize={'28px'} fontWeight={'Bold'} component={'header'}>{heading}</Typography>

      <Box sx={({ 'flexGrow': 1 })}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography paragraph>
              A fantasy-based messaging app that is designed for
              the roleplay-inclined. Come share in adventures or merely chat with others
              about those adventures. Practice your roleplaying skills to dive into a new
              world!
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <RegisterForm />

            <Box mt={'5%'} sx={({ 'display':'flex', 'justifyContent': 'center', 'flexDirection':'column', 'borderTop':'1px solid black', 'alignItems':'flex-start' })}>
              <Typography paragraph fontWeight={'Bold'}>
                Already a member?
              </Typography>
              <Button variant='outlined' onClick={onLogin}>
                Login
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default LandingPage;
