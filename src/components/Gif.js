import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppIcon from "../images/icon-transparent.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../utils/MyButton";
import DeleteGif from "./DeleteGif";
import GifDialog from "./GifDialog";
import LikeButton from "./LikeButton";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import ChatIcon from "@material-ui/icons/Chat";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

// Redux
import { connect } from "react-redux";

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
    dayjs.extend(relativeTime);

    const {
      classes,
      gif: {
        gifId,
        title,
        url,
        createdAt,
        Likes,
        Comments,
        userId,
        User: { firstName, lastName, avatar },
      },
      user: { authenticated },
    } = this.props;

    const commentButton = !Comments ? (
      <MyButton tip="commentaires" aria-label="commentaires">
        <ChatBubbleOutlineIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="commentaires" aria-label="commentaires">
        <ChatIcon color="primary" />
      </MyButton>
    );

    const deleteButton = authenticated &&
      JSON.parse(localStorage.getItem("userId")) === userId && (
        <DeleteGif gifId={gifId} />
      );

    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            avatar ? (
              <Avatar src={avatar} alt="avatar" className={classes.avatar} />
            ) : (
              <Avatar src={AppIcon} alt="avatar" className={classes.avatar} />
            )
          }
          action={[deleteButton]}
          title={title}
          subheader={
            "par " +
            firstName +
            " " +
            lastName +
            " - " +
            dayjs(createdAt).fromNow()
          }
          color="inherit"
        />
        <CardMedia
          className={classes.media}
          image={url}
          component={Link}
          to={`/gifs/${gifId}`}
        />
        <CardActions disableSpacing>
          <LikeButton gifId={gifId} />
          {Likes ? <span>{Likes.length}</span> : <span>0</span>}
          {commentButton}
          {Comments ? <span>{Comments.length}</span> : <span>0</span>}
          <GifDialog gifId={gifId} userId={userId} />
        </CardActions>
      </Card>
    );
  }
}

Gif.propTypes = {
  user: PropTypes.object.isRequired,
  gif: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Gif));
