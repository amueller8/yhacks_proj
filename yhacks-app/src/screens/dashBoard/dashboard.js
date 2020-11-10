import React from 'react';
import {Box, Typography, Button, Input} from '@material-ui/core';
import CommunityCard from '../../components/communityPost.js';
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux"
import {Redirect} from "react-router";
import {withRouter} from "react-router";
import * as actions from "../../store/actions/auth";


const styles = {
    layout: {
        backgroundColor: '#CDEDF6',
        height: '100%', // this lowkey doesn't do anything rip
        color: 'white',
        /*display: 'flex',*/
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '10%',
    },
    link: {

        textDecoration: 'none',

    },
    button: {
        width: '100%',
        marginTop: '30%',
        marginBottom: '30%',
        borderRadius: '0px',
        //color: 'secondary',
        backgroundColor: '#78A1BB',
        color: '#FFFFFF',
        textTransform: 'lowercase',
        //width: "13vw",
        height: "5vh",

    }

}

const test_community = {
    name: "Test Community",
    created: "[creation date]",
    communityUrl: "/login",
    imageSrc: "testimage.png",
    communityDescription: "This is just an example description of a community."

  }

const Dashboard = (props) => {
    if(localStorage.getItem("token") && !props.token) {
        props.checkState()
    }
    else if(!localStorage.getItem("token") || !(localStorage.getItem("token") === props.token)) {
        return <Redirect push to="/login" />
    }

    const handleLogout = event => {
        event.preventDefault()
        props.logout()
    }

    return(
        <div style={ styles.layout}>

            <Typography variant="h1">traction</Typography>

            <Grid container spacing = {3}>
                <Grid item xs={4}>
                    <CommunityCard list={test_community} ></CommunityCard>
                </Grid>
                <Grid item xs={4}>
                    <CommunityCard list={test_community} ></CommunityCard>
                </Grid>
                <Grid item xs={4}>
                    <CommunityCard list={test_community} ></CommunityCard>
                </Grid>
                <button onClick={handleLogout}>
                    Logout
                </button>
            </Grid>




        </div>

    )
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return{
        checkState: () => dispatch(actions.checkState()),
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))