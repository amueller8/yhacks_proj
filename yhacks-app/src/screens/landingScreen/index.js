import React from 'react';
import {Box, Typography, Button} from '@material-ui/core';
import {Link} from 'react-router-dom';

const styles = {
    layout: {
        height: "100%",
        width: "100%",
        backgroundColor: '#CDEDF6',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: "100%"
    },
    link: {
        textDecoration: 'none',
    },
    button: {
        width: '150px',
        height: '50px',
        margin: "5%",
        borderRadius: '0px',
        backgroundColor: '#78A1BB',
        color: '#FFFFFF',
        textTransform: 'lowercase',
    }

}

const LandingScreen = () => {
    return(
        <div style={ styles.layout}>
            <Box>
                <Typography variant="h1" style={{fontSize: "15vw"}}>traction</Typography>
            </Box>
            <Box display='flex' flexDirection="column" alignItems='center'>
                <Link to="/login" style={styles.link}>
                    <Button size='large' pt={2} style={styles.button}>
                    take action
                    </Button>
                </Link>
            </Box>
        </div>
    )
}

export default LandingScreen;