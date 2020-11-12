import React  from 'react';
import { Box, Typography, Button, makeStyles, fade, Divider, AccordionActions } from '@material-ui/core';
import CommunityCard from '../../components/communityPost.js';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux"
import { Redirect } from "react-router";
import { withRouter } from "react-router";
import * as actions from "../../store/actions/auth";
import MyAppBar from "../../components/menuBar";

//accordion
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// back end link head for any none socket proctored API calls
let linkHead = "http://localhost:8000/api"


const category_to_community = (communities, categoryName) => {
    let communitiesList = []
    for (let community of communities) {
        if (!!community) {
            communitiesList.push(
                <Grid item xs={4}>
                    <CommunityCard list={community} private={false} linkHead={linkHead} category={categoryName} />
                </Grid>
            )
        }
    }
    return <Grid container spacing={3}>{communitiesList} </Grid>
}

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    column: {
        flexBasis: '33.33%',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));


const styles = {
    layout: {
        backgroundColor: '#CDEDF6',
        height: '100%', // this lowkey doesn't do anything rip
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

function Dashboard(props) {
    const classes = useStyles();
    const [categories, setCategories] = React.useState([])
    const [mount, setMount] = React.useState(false)

    const getCategories = () => {
        fetch(`${linkHead}/category/`, {
        }).then(res => res.json())
            .then(data => {
                setCategories(data)
                setMount(true)
            })
            .catch(err => { })
    }
    if (!mount) {
        getCategories()
    }

    if (localStorage.getItem("token") && !props.token) {
        props.checkState()
    }

    else if (!localStorage.getItem("token") || !(localStorage.getItem("token") === props.token)) {
        return <Redirect push to="/login" />
    }

    const addButtonHandler = event => {
        event.preventDefault()
        console.log("Add button")
    };

    const category_to_accordion = (categories) => {
        let categoriesList = categories.map(function (category) {
            return (
                <div className={classes.root}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1c-content"
                            id="panel1c-header"
                        >
                            <div className={classes.column}>
                                <Typography className={classes.heading}>{category.name}</Typography>
                            </div>
                            <div className={classes.column}>
                                <Typography className={classes.secondaryHeading}>{category.description}</Typography>
                            </div>
                        </AccordionSummary>
                        <Divider />
                        <div>
                            <h1>Open Communities</h1>
                        </div>
                        <Divider />
                        <AccordionActions>
                            <Button
                                size="small"
                                color="primary"
                                onClick={addButtonHandler}
                            >
                                Add
                            </Button>
                        </AccordionActions>
                        <AccordionDetails className={classes.details}>
                            {category_to_community(category["communities"], category["name"])}
                        </AccordionDetails>
                        <Divider />
                        <div>
                            <h1>Private Communities</h1>
                        </div>
                        <Divider />
                        <AccordionActions>
                            <Button
                                size="small"
                                color="primary"
                                onClick={addButtonHandler}
                            >
                                Add
                            </Button>
                        </AccordionActions>
                        <AccordionDetails className={classes.details}>
                            {category_to_community(category["private_communities"], category["name"])}
                        </AccordionDetails>
                    </Accordion>
                </div>
            );
        })
        return <Box>{categoriesList} </Box>
    }

    return (
        <div style={styles.layout}>
            <MyAppBar {...props} />
            {category_to_accordion(categories)}
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
    return {
        checkState: () => dispatch(actions.checkState()),
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))