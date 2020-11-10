import React from 'react';
import {Switch, Route, Redirect} from 'react-router';
import {BrowserRouter as Router } from "react-router-dom"
import {connect} from "react-redux"
import LandingScreen  from '../screens/landingScreen';
import SignUp from '../screens/loginScreen/SingUpPage';
import LoginPage from '../screens/loginScreen/LoginPage';
import ReconnectingWebSocket from "reconnecting-websocket";
import Dashboard from "../screens/dashBoard/dashBoard";
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
                    <Route exact path="/login"><LoginPage {...props}/></Route>
                    <Route exact path="/signup"><SignUp {...props}/></Route>
                    <Route exact path={"/"}><LandingScreen {...props}/></Route>
                    <Route exact path={"/dashboard"} component={Dashboard} />
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