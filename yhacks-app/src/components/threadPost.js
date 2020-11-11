import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid'

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    root: {
      maxWidth: '80%',
      marginLeft: '5%',
      marginRight: '5%',
      textAlign: 'left',
      padding: '3%',
      borderRadius: '2',
      color: 'black',
      backgroundColor: 'whitesmoke',
    },
    /*
    media: {
      height: 140,
      maxwidth: 345,
    },*/
    listItem: {
      width: '100%',
      alignContent: 'left',
      textAlign: 'left',
      
      
      //background color later or whatever
    },
    button:{
      backgroundColor: "orange",
      color: "white",
      width: '100%',
    },
    link: {
      textDecoration: 'none',
      color: 'white',
      width: '100%',
    },
    description: {
      textAlign: 'left',
    },
    username: {
      position: 'relative',
      //textAlign: 'center',
      left: '1em',
      
      
    }
  });
  


// create each individual chat
// (involves poster (name, maybe an avatar), time posted??, message)
  
  
  export default function ThreadPost(props) {
    const classes = useStyles();
    const list = props.list;

    return (
    <Grid className = {classes.root}>

    
    
    <List >
    <ListItem className = {classes.listItem}>
    <Avatar >{list.user.name[0].toUpperCase()}</Avatar>
    <ListItemText className = {classes.username} primary={list.user.name}/>
    </ListItem>
    <Divider component="li" />
    </List>

    <Typography className = {classes.username} variant = 'overline'>{list.date}</Typography>
    <Typography className = {classes.username} variant = 'body1'>{list.memo}</Typography>

    </Grid>

    );
  }