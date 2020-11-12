import React, { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import StarsIcon from "@material-ui/icons/Stars";
import MailIcon from "@material-ui/icons/Mail";

const styles = {
  root: {
    maxWidth: 600,
    marginBottom: 20,
  },
  media: {
    maxWidth: 600,
    minHeight: 400,
  },
};

export class Gif extends Component {
  render() {
    dayjs.extend(relativeTime)

    const {
      classes,
      gif: {
        gifId,
        title,
        url,
        createdAt,
        User: { firstName, lastName },
      },
    } = this.props;
    
    return (
      <Card className={classes.root}>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreHorizIcon />
            </IconButton>
          }
          title={title}
          subheader={
            "par " + firstName + " " + lastName + " - " + dayjs(createdAt).fromNow()
          }
          component={Link}
          to={`/gifs/${gifId}`}
          color="inherit"
        />
        <CardMedia
          className={classes.media}
          image={url}
          component={Link}
          to={`/gifs/${gifId}`}
        />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <StarsIcon />
          </IconButton>
          <IconButton aria-label="share">
            <MailIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(Gif);
