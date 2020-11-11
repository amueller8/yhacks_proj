import React from 'react';
import {Box, Typography, Button, Input} from '@material-ui/core';
import CommunityCard from '../../components/communityPost.js';
import Grid from '@material-ui/core/Grid';
import {connect} from "react-redux"
import {Redirect} from "react-router";
import {withRouter} from "react-router";
import * as actions from "../../store/actions/auth";

//accordion
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const category_to_community = (props) => {
    const list = props.list

    var communities = props.communities
    var communitiesList = communities.map(function(community){
                    return <Grid item xs={4}>
                            <CommunityCard list={community} ></CommunityCard>
                            </Grid>
                    })

        return  <Grid container spacing = {3}>{ communitiesList } </Grid>


}

const category_to_accordion = (props) => {
    const list = props.list

    var categories = props.categories
    var categoriesList = categories.map(function(category){
                    return(
                        <Accordion>
                        <AccordionSummary expandIcon={
                        //<ExpandMoreIcon />
                        "*"
                        }

                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography>{category.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                        {category.categoryDescription}
                        </Typography>

                        {category_to_community(category)}


                        </AccordionDetails>
                        </Accordion>

                    )  

                    })

        return  <Box>{ categoriesList } </Box>


}
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

  const test_category = {
    name: "Environmental Activism",
    created: "Nov 2020",
    communities: [test_community, test_community, test_community2, test_community2, test_community],
    imageSrc: "testimage.png",
    categoryDescription: "Description of category."


}

const categories_list_test = {
    categories: [test_category, test_category, test_category],
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

            {category_to_accordion(categories_list_test)}

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
    return{
        checkState: () => dispatch(actions.checkState()),
        logout: () => dispatch(actions.logout())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard))