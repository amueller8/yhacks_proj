import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';
import { Redirect, withRouter } from "react-router"
import { connect } from "react-redux"
import * as actions from "../../store/actions/auth";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));

const CustomziedButton = styled(Button)({
    background: 'linear-gradient(#0083B0, #00B4DB)',
    border: 0,
    borderRadius: 5,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'black',
    height: 48,
    padding: '0 30px',
});

const onClickHandler = (event) => {
    event.preventDefault();
    console.log("Join");
}


function CommunityPage(props) {
    const classes = useStyles();

    // if (localStorage.getItem("token") && !props.token) {
    //     props.checkState()
    // }
    // else if (!localStorage.getItem("token") || !("Token " + (localStorage.getItem("token")) === props.token)) {
    //     return <Redirect push to="/login" />
    // }
    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Community Name
                    </Typography>
                </Toolbar>
            </AppBar>
            <menuBar />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Community Name
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            This is the description of the community.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <CustomziedButton variant="contained" color="primary" style={{ fontSize: '18px' }} onClick={onClickHandler}>
                                        Join
                                    </CustomziedButton>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                </div>

                <div className={classes.root} style={{ minWidth: '450px' }}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Admins</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <div>
                                    <ul style={{ fontSize: '16px' }}>
                                        <li> Name: email address </li>
                                        <li> Name: email address </li>
                                        <li> Name: email address </li>
                                    </ul>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Members</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <div>
                                    <ul style={{ fontSize: '16px' }}>
                                        <li> Name: email address </li>
                                        <li> Name: email address </li>
                                        <li> Name: email address </li>
                                    </ul>
                                </div>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Threads/Discussion</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Under construction, thank you for your patience.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </main>
        </React.Fragment >
    );
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkState: () => dispatch(actions.checkState()),
        logout: () => dispatch(actions.logout())
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommunityPage))