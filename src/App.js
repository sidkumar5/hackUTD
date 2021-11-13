import './App.css';
import React, { useEffect } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Axios from 'axios'

import NavBar from './NavBar/NavBar';
import LandingPageBox from './LandingPageBox/LandingPageBox';
import SurveyBox from './SurveyBox/SurveyBox';
import SwipeBox from './SwipeBox/SwipeBox';
import FinalLink from './FinalLink/FinalLink';

function App() {

  // useEffect(() => {
  //   Axios.post('http://localhost:3001/rand', {username: "brownmamba156@gmail.com", password: "314159265"}).then(() => {
  //     console.log('success') // .then waits for completion and runs code inside brackets
  //   })
  // }, [])

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <div className="App">
              <NavBar></NavBar>
              <LandingPageBox></LandingPageBox>
            </div>
          </Route>
          <Route path="/matchsurvey" exact>
            <div className="App">
              <NavBar></NavBar>
              <SurveyBox></SurveyBox>
            </div>
          </Route>
          <Route path="/matchinterface" exact>
            <div className="App">
              <NavBar></NavBar>
              <SwipeBox></SwipeBox>
            </div>
          </Route>
          <Route path="/matchlink" exact>
            <div className="App">
              <NavBar></NavBar>
              <FinalLink></FinalLink>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
