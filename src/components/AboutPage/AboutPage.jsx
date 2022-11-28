import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>
          Fableguild is a fantasy-based messaging app for those who are 
          wanting to tap into their roleplaying skill. This app is created
          for those who want a stepping stone into their inner characters'
          shoes to cultivate their acting abilities as well as find their
          aptitude for other games such as Dungeons and Dragons and the like.
          <br></br>
          <br></br>
          Technologies used:
          <ul>
            <li>JavaScript</li>
            <li>React-Redux-Sagas</li>
            <li>Node.js</li>
            <li>Socket.io</li>
            <li>PostgreSQL</li>
            <li>Express</li>
          </ul>
          - Adam Lee
          <br></br>
          <a href="https://github.com/adamantdude">Github</a>
          <br></br>
          <a href="https://www.linkedin.com/in/adamlee222412/">LinkedIn</a>
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
