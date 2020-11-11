import React, { useEffect } from 'react';
import { Box, Typography, Button, Input, AppBar, Toolbar, IconButton, MenuItem, Badge, makeStyles, fade, Menu, InputBase, Divider, AccordionActions } from '@material-ui/core';
import CommunityCard from '../../components/communityPost.js';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux"
import { Redirect } from "react-router";
import { withRouter } from "react-router";
import * as actions from "../../store/actions/auth";

// Icons for the navigation bar 
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

//accordion
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// back end link head for any none socket proctored API calls
let linkHead = "http://localhost:8000/api"


const category_to_community = (category) => {
    let communitiesList = []
    for (let community of category["communities"]) {
        if (!!community) {
            communitiesList.push(
                <Grid item xs={4}>
                    <CommunityCard list={community} private={false} linkHead={linkHead} category={category.name} />
                </Grid>
            )
        }
    }
    for (let community of category["private_communities"]) {
        if (!!community) {
            communitiesList.push(
                <Grid item xs={4}>
                    <CommunityCard list={community} private={true} linkHead={linkHead} category={category.name} />
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


const test_community = {
    name: "Test Community",
    created: "[creation date]",
    communityUrl: "/login",
    imageSrc: "testimage.png",
    communityDescription: "This is just an example description of a community.",
    private: 0,

}

const test_community2 = {
    name: "Test Community 2",
    created: "[creation date]",
    communityUrl: "/login",
    imageSrc: "testimage.png",
    communityDescription: "This is just another example description of a community.",
    private: 1,

}

// const test_category = {
//     name: "Environmental Activism",
//     created: "Nov 2020",
//     communities: [test_community, test_community, test_community2, test_community2, test_community],
//     imageSrc: "testimage.png",
//     categoryDescription: "Description of category."
// }
//
// const categories_list_test = {
//     categories: [test_category, test_category, test_category],
// }

function Dashboard(props) {
    const classes = useStyles();
    const [categories, setCategories] = React.useState([])
    const [mount, setMount] = React.useState(false)
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);

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

    const handleLogout = event => {
        event.preventDefault()
        props.logout()
    }

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
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
                        <AccordionActions>
                            <Button size="small" color="primary">
                                Add
                            </Button>
                        </AccordionActions>
                        <AccordionDetails className={classes.details}>
                            {category_to_community(category)}
                        </AccordionDetails>
                    </Accordion>
                </div>
            );
        })
        return <Box>{categoriesList} </Box>
    }

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton aria-label="show 11 new notifications" color="inherit">
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );
    return (
        <div style={styles.layout}>
            <div className={classes.grow}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" noWrap>
                            Website Name
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <IconButton color="inherit">
                                <MailIcon />
                            </IconButton>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
                {renderMenu}
            </div>
            {category_to_accordion(categories)}
            {/*
            <Accordion>

            <AccordionSummary
            expandIcon={
            //<ExpandMoreIcon />
            "*"
            }

            aria-controls="panel1a-content"
            id="panel1a-header">
            <Typography>{test_category.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
            <Typography>
            {test_category.categoryDescription}
            </Typography>

            {category_to_community(test_category)}

            </AccordionDetails>
        </Accordion>
        */}
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