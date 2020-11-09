import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import { LandingScreen } from '../screens/landingScreen';
import SignUp from '../screens/loginScreen/SingUpPage';
import LoginPage from '../screens/loginScreen/LoginPage';
import Dashboard from '../screens/dashBoard/dashboard.js';

function Routes(props) {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path={"/"} component={LandingScreen} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;