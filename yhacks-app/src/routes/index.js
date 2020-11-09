import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import { LandingScreen } from '../screens/landingScreen';
import SignUp from '../screens/loginScreen/SingUpPage.js';
import LoginPage from '../screens/loginScreen/LoginPage.js';
import {Dashboard}from '../screens/dashBoard/dashboard.js';

function Routes(props) {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path={"/"} component={LandingScreen} />
          <Route exact path={"/dashboard"} component={Dashboard} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;