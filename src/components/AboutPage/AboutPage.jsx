import React from 'react';
import './AboutPage.css';
import githubQR from './githubQR.png';
import linkedInQR from './linkedInQR.png';
import { Box, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {


  return (
    <div className="container" id="aboutPage">
      <Typography component={"p"} sx={{ backgroundColor: "#FFFFFF45", p: "10px" }}>
        Fableguild is a fantasy-based messaging app for those who are
        wanting to tap into their roleplaying skill. This app is created
        for those who want a stepping stone into their inner characters'
        shoes to cultivate their acting abilities as well as find their
        aptitude for other games such as Dungeons and Dragons and the like.
        I hope to continue working on this project to make it look better with
        a friends list function and more game aspects that include battles, loot,
        and quests!
      </Typography>
      <Box sx={({ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#FFFFFF40' })}>
        <Typography variant={"h5"}>Technologies used:</Typography>
        <List sx={{ display: 'flex' }}>
          <ListItem><ListItemText>HTML/CSS</ListItemText></ListItem>
          <ListItem><ListItemText>JavaScript</ListItemText></ListItem>
          <ListItem><ListItemText>Socket.io</ListItemText></ListItem>
          <ListItem><ListItemText>React-Redux-Sagas</ListItemText></ListItem>
          <ListItem><ListItemText>Node.js</ListItemText></ListItem>
          <ListItem><ListItemText>Express</ListItemText></ListItem>
          <ListItem><ListItemText>PassportJS</ListItemText></ListItem>
          <ListItem><ListItemText>PostgreSQL</ListItemText></ListItem>
          <ListItem><ListItemText>Figma</ListItemText></ListItem>
          <ListItem><ListItemText>dbDesigner</ListItemText></ListItem>
        </List>
      </Box>
      <Box>
        <Typography>
          Thank you!
        </Typography>
        <Typography>
          Family and Friends
        </Typography>
        <Typography>
          Prime Digital Academy
        </Typography>
        <Typography>
          Ramirez Cohort
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={githubQR} />
            <a href="https://github.com/adamantdude">Github / adamantdude</a>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={linkedInQR} />
            <a href="https://www.linkedin.com/in/adamlee222412/">LinkedIn / adamlee222412</a>
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
}

export default AboutPage;
