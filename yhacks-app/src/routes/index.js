import React from 'react';
import { Switch, Route } from 'react-router';
import { BrowserRouter as Router } from "react-router-dom"
import { connect } from "react-redux"
import LandingScreen from '../screens/landingScreen';
import SignUp from '../screens/loginScreen/SingUpPage';
import LoginPage from '../screens/loginScreen/LoginPage';
import ReconnectingWebSocket from "reconnecting-websocket";
import Dashboard from "../screens/dashBoard/dashboard";
import Thread from "../components/threadChat";
import UserDashboard from '../screens/dashBoard/UserDashboard';

function Routes(props) {
  const socket = props.socket
  socket.onopen = e => {
    console.log('socket open')
  }
  socket.onclose = e => {
    console.log('socket close')
  }
  socket.onerror = e => {
    console.log(e)
  }
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login"><LoginPage {...props} /></Route>
          <Route exact path="/signup"><SignUp {...props} /></Route>
          <Route exact path={"/"}><LandingScreen {...props} /></Route>
          <Route exact path={"/dashboard"}><Dashboard {...props} /></Route>
          <Route exact path={"/account"}><UserDashboard {...props} /></Route>
          <Route exact path={"/thread/"}><Thread {...props} /></Route>
        </Switch>
      </Router>
    </div>
  );
}
const mapStateToProps = state => {
  const endpoint = "ws://localhost:8000/ws/"
  let socket = new ReconnectingWebSocket(endpoint)
  return {
    socket: socket
  }
}
export default connect(mapStateToProps, null)(Routes);