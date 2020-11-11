import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// divider stuff
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Link from '@material-ui/core/Link';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginLeft: '5%',
    marginRight: '5%',
  },
  media: {
    height: 140,
    maxwidth: 345,
  },
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

const is_private = (props) => {
  if (props.private) {
    return <LockIcon/>
  }
  else {
    return <LockOpenIcon/>
  }

}


export default function CommunityCard(props) {
  const classes = useStyles();
  const list = props.list;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          // get the image from the assets folder based on the list passed into the object
          //image ={require(`../assets/${list.imageSrc}`)}
          //title="community image" //can fix this to be {list.imageTitle} or something later
          
        />
        <CardContent>
          {/*
          <Typography gutterBottom variant="h5" component="h2">
            {list.name}
          </Typography>*/}
          <List className = {classes.listItem}>
          <ListItem >
          <ListItemText primary={list[0]} secondary= {list[2]}/> {/* community name, creation date */}
          </ListItem>
          <Divider component="li" />
          </List>
          <Typography variant="body2" color="textSecondary" component="p" className = {classes.description}>
          {/*{is_private(list.private)}
          if we do icons it would probably be here? or replacing image...
          */}
          {list[1]} {/* community will need description */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Link href={`${props.linkHead}/community/${props.category}/${list[0]}/`} className={classes.link}>
        <Button size="small" color="primary" className = {classes.button}>
                <span> {is_private(props)} </span>
        </Button>
        </Link>
      </CardActions>
    </Card>
  );
}