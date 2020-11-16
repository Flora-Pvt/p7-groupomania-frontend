import React, { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import AppIcon from "../images/icon-transparent.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../utils/MyButton";
import DeleteGif from "../components/DeleteGif";

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ChatIcon from "@material-ui/icons/Chat";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

import { connect } from "react-redux";
import { likeGif, unlikeGif } from "../redux/network/gifNetwork";

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
  likedGif = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.gifId === this.props.gif.gifId)
    ) {
      return true;
    } else return false;
  };

  likeGif = () => {
    this.props.likeGif(this.props.gif.gifId);
  };

  unlikeGif = () => {
    this.props.unlikeGif(this.props.gif.gifId);
  };

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
      },
      user: {
        credentials: { firstName, lastName, avatar },
        authenticated,
      },
    } = this.props;

    const likeButton = !authenticated ? (
      <MyButton tip="Aimer">
        <Link to="/login">
          <StarBorderIcon color="primary" />
        </Link>
      </MyButton>
    ) : this.likedGif() ? (
      <MyButton tip="Ne plus aimer" onClick={this.unlikeGif}>
        <StarIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Aimer" onClick={this.likeGif}>
        <StarBorderIcon color="primary" />
      </MyButton>
    );

    const commentButton =
      !Comments ? (
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
          action={
              [deleteButton]
          }
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
          {likeButton}
          {Likes ? <span>{Likes.length}</span> : <span>0</span>}
          {commentButton}
          {Comments ? <span>{Comments.length}</span> : <span>0</span>}
        </CardActions>
      </Card>
    );
  }
}

Gif.propTypes = {
  user: PropTypes.object.isRequired,
  gif: PropTypes.object.isRequired,
  likeGif: PropTypes.func.isRequired,
  unlikeGif: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  likeGif,
  unlikeGif,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Gif));
