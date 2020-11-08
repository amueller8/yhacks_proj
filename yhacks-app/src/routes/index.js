import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


import { LandingScreen } from '../screens/landingScreen';
import LoginPage from '../screens/loginScreen/LoginPage';

function Routes(props) {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path={"/"} component={LandingScreen} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;