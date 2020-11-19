import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

// Redux
import { connect } from "react-redux";
import { getOneGif } from "../../redux/actions/gifActions";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    width: 700,
    margin: "auto",
    marginBottom: 20,
  },
  header: {
    width: "95%",
  },
  media: {
    alignSelf: "center",
    maxWidth: 700,
  },
  chatIcon: {
    marginLeft: 10,
    paddingTop: 5,
    heigth: 33,
    width: 24,
  },
};

export class Gif extends Component {
  handleClick = (event) => {
    if (
      event.target.id == null ||
      event.target.id === undefined ||
      !event.target.id
    ) {
      event.preventDefault();
    } else {
      this.props.getOneGif(event.target.id);
    }
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
        User,
      },
      user: { authenticated },
    } = this.props;

    const deleteButton = authenticated &&
      JSON.parse(localStorage.getItem("userId")) === userId && (
        <DeleteButton gifId={gifId} className={classes.delete} />
      );

      const gifMarkup = User ? (<Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar src={User.avatar} alt="avatar" className={classes.avatar} />
          }
          action={deleteButton}
          title={title}
          subheader={
            "par " +
            User.firstName +
            " " +
            User.lastName +
            " - " +
            dayjs(createdAt).fromNow()
          }
          color="inherit"
          className={classes.header}
        />
        <Link to={"/gif/" + gifId} onClick={this.handleClick} >
          <img src={url} alt="GIF" id={gifId} className={classes.media} />
        </Link>
        <CardActions disableSpacing>
          <LikeButton gifId={gifId} />
          <span>{Likes.length}</span>
          <Link
            to={"/gif/" + gifId}
            onClick={this.handleClick}
            className={classes.chatIcon}
          >
            <ChatBubbleOutlineIcon id={gifId} />
          </Link>
          <span>{Comments.length}</span>
        </CardActions>
      </Card>) : (<Card className={classes.root}>Impossible d'afficher le GIF</Card>)

    return (
    <Fragment>{gifMarkup}</Fragment>
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

const mapActionsToProps = {
  getOneGif,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Gif));
