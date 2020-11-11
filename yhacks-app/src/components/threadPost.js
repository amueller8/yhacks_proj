import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles({
    root: {
      maxWidth: '50%',
      marginLeft: '5%',
      marginRight: '5%',
    },
    /*
    media: {
      height: 140,
      maxwidth: 345,
    },*/
    listItem: {
      width: '100%',
      maxWidth: 360,
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
  });
  


// create each individual chat
// (involves poster (name, maybe an avatar), time posted??, message)
  
  
  export default function ThreadPost(props) {
    const classes = useStyles();
    const list = props.list;
    return (
    <Box className = {classes.root}>

    <span>
    <Avatar>{list.user.name[0].toUpperCase()}</Avatar>
    <Typography>{list.user.name}</Typography>
    </span>
    
    <List className = {classes.listItem}>
    <Divider component="li" />
    </List>

    <Typography variant = 'overline'>{list.date}</Typography>
    <Typography variant = 'body1'>{list.memo}</Typography>

    </Box>

    );
  }