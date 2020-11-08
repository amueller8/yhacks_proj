import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import {LoginScreen} from '../screens/loginScreen';
import {LandingScreen} from '../screens/landingScreen';

function Routes(props) {
  return(
    <div>
      <Router>
        <Switch>
          <Route exact path={"/login"} component={LoginScreen} />
          <Route exact path={"/"} component={LandingScreen} />
        </Switch>
      </Router>
    </div>
  );
}

export default Routes;