import React from 'react';
import {Box, Typography, Button, Input} from '@material-ui/core';
import {Link} from 'react-router-dom';

const styles = {
    layout: {
        backgroundColor: '#CDEDF6',
        color: 'white',
        /*display: 'flex',*/
        justifyContent: 'center',
        alignItems: 'center',
    },
    link: {

        textDecoration: 'none',

    },
    button: {
        width: '100%',
        marginTop: '30%',
        marginBottom: '30%',
        borderRadius: '0px',
        color: 'secondary',
        backgroundColor: '#78A1BB',
        color: '#FFFFFF',
        textTransform: 'lowercase',
        width: "13vw",
        height: "5vh",

    }
    


}

export const LandingScreen = () => {
    return(
        <div style={ styles.layout}>
            <Box>
            <Typography variant="h1">traction</Typography>
            </Box>
            <Box display='flex' flexDirection="column" alignItems='center'>
            <Link to="/login" style={styles.link}>
            <Button fullWidth="true" size='large' pt={2} style={styles.button}>
            take action
            </Button>
            </Link>
            </Box>


        </div>
 
    )
}