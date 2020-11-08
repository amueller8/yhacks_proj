import React from 'react';
import {Box, Typography, Button, Input} from '@material-ui/core';
import {Link} from 'react-router-dom';

const styles = {
    layout: {
        backgroundColor: '#CDEDF6';
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    


}

export const LandingScreen = () => {
    return(
        <div style={ styles.layout}>
            <Box>
            <img src={flowerish} style={styles.flowerish}/>
            <Typography variant="h1">flowerish</Typography>
            </Box>


        </div>

    )
}