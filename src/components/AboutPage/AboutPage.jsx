import React from 'react';
import './AboutPage.css';
import githubQR from './githubQR.png';
import linkedInQR from './linkedInQR.png';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {


  return (
    <div className="container" id="aboutPage">
      <p>
        Fableguild is a fantasy-based messaging app for those who are
        wanting to tap into their roleplaying skill. This app is created
        for those who want a stepping stone into their inner characters'
        shoes to cultivate their acting abilities as well as find their
        aptitude for other games such as Dungeons and Dragons and the like.
      </p>
      <label htmlFor='techList'>Technologies used:</label>
      <ul id="techList">
        <li>HTML/CSS</li>
        <li>JavaScript</li>
        <li>Socket.io</li>
        <li>React-Redux-Sagas</li>
        <li>Node.js</li>
        <li>Express</li>
        <li>PostgreSQL</li>
      </ul>
      <p>
        Thank you!
        <br></br>
        Family and Friends
        <br></br>
        Prime Digital Academy
        <br></br>
        Ramirez Cohort
      </p>
      <img src={githubQR} />
      <a href="https://github.com/adamantdude">Github / adamantdude</a>
      <br></br>
      <img src={linkedInQR} />
      <a href="https://www.linkedin.com/in/adamlee222412/">LinkedIn / adamlee222412</a>
    </div>
  );
}

export default AboutPage;
