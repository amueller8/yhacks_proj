import React from 'react';
import {Box, Typography, Button, Input} from '@material-ui/core';
import {Link} from 'react-router-dom';
import CommunityCard from '../../components/communityPost.js';
import Grid from '@material-ui/core/Grid';

//accordion
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
//import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    communityDescription: "This is just an example description of a community."
  
  }

const test_category = {
    name: "Environmental Activism",
    created: "Nov 2020",
    communities: [test_community, test_community, test_community, test_community, test_community],
    imageSrc: "testimage.png",
    categoryDescription: "Description of category."


}

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
// props could go in here i can make it a seperate component later
export const Dashboard = () => {
    //const list = props.list

    return(
        <div style={ styles.layout}>
            
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

            {/*
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

            */}


        </div>
 
    )
}