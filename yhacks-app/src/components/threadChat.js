import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Button, GridList} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import * as actions from "../store/actions/auth";
import {Redirect, withRouter} from "react-router";
import {connect} from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  inline: {
    display: 'inline',
  },
}));

function Thread(props) {
  const classes = useStyles();
  const [textValue, setTextValue] = React.useState("")
  const [replyTo, setReplyTo] = React.useState(false)

  if (localStorage.getItem("token") && !props.token) {
        props.checkState()
  }
  else if (!localStorage.getItem("token") || !(localStorage.getItem("token") === props.token)) {
        return <Redirect push to="/login" />
  }

  function handlePost(event) {
    const data = {
      "memo": textValue,
      "token": props.token,
      "community": props.community,
      "thread": props.thread
    }
    if (replyTo) {
      data["reply"] = replyTo
    }
    console.log(data)
    props.socket.send(JSON.stringify(data))
    setReplyTo(false)
  }
  function handleTextChange(event) {
    const {value} = event.target
    setTextValue(value)
  }

  function handleReply() {
    setReplyTo(true)
  }

  function Comment(props) {
    const classes = useStyles();

    return (
        <List className={classes.root}>
          <Divider variant="inset" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary="Oui Oui"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Sandra Adams
                  </Typography>
                  {' — Do you have Paris recommendations? Have you ever…'}
                </React.Fragment>
              }
            />
            <Button size="small" color="primary" onClick={handleReply}>
                reply
            </Button>
          </ListItem>
        </List>
      );
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>Thread Title</Paper>
        </Grid>
        <Grid item xs={12}>
          <GridList >
            <Comment/>
          </GridList>
        </Grid>
      </Grid>
      <div className={classes.root}>
        <TextField
          id="filled-full-width"
          label="Comment"
          style={{ margin: 8 }}
          placeholder="Type Comment Here"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          value={textValue}
          onChange={handleTextChange}
        />
        <Button
            size="small"
            color="primary"
            onClick={handlePost}
        >
            Post
        </Button>
      </div>
    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Thread))

