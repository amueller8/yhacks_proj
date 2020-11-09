import React from 'react';
import {Box, Typography, Button, Input} from '@material-ui/core';
import {Link} from 'react-router-dom';
import CommunityCard from '../../components/communityPost.js';
import Grid from '@material-ui/core/Grid';

const styles = {
    layout: {
        backgroundColor: '#CDEDF6',
        height: '100%', // this lowkey doesn't do anything rip 
        width: '100%',
        color: 'white',
        /*display: 'flex',*/
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: '100%',
    },
    link: {

        textDecoration: 'none',

    },
    button: {
        width: '100%',
        margin: '5%',
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

export const LandingScreen = () => {
    return(
        <div style={ styles.layout}>
            
            <Typography variant="h1">traction</Typography>
            
            <Box display='flex' flexDirection="column" alignItems='center'>
            <Link to="/login" style={styles.link}>
            <Button fullWidth="true" size='large' pt={2} style={styles.button}>
            sign up or log in
            </Button>
            </Link>
            <Link to="/dashboard" style={styles.link}>
            <Button fullWidth="true" size='large' pt={2} style={styles.button}>
            view communities
            </Button>
            </Link>
            </Box>
            




        </div>
 
    )
}