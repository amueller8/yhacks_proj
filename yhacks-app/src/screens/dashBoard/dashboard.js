import React from 'react';
import {Box, Typography, Button, Input} from '@material-ui/core';
import {Link} from 'react-router-dom';
import CommunityCard from '../../components/communityPost.js';
import Grid from '@material-ui/core/Grid';

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

export const Dashboard = () => {
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
            </Grid>




        </div>
 
    )
}