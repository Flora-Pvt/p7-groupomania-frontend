import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import EditGif from "./EditGif";
import DeleteButton from "./DeleteButton";
import LikeButton from "./LikeButton";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

// Redux
import { connect } from "react-redux";
import { getOneGif } from "../../redux/actions/gifActions";

const styles = (theme) => ({
  ...theme.styling,
});

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
    const {
      classes,
      gif: { gifId, title, url, createdAt, Likes, Comments, userId, User },
      user: { authenticated },
    } = this.props;

    const altAvatar = "avatar de " + User.firstName;
    const altImg = "GIF" + title;

    dayjs.extend(relativeTime);
    dayjs.extend(updateLocale);
    dayjs.updateLocale("en", {
      relativeTime: {
        future: "dans %s",
        past: "il y a %s",
        s: "quelques secondes",
        m: "une minute",
        mm: "%d minutes",
        h: "une heure",
        hh: "%d heures",
        d: "un jour",
        dd: "%d jours",
        M: "un mois",
        MM: "%d mois",
        y: "un an",
        yy: "%d ans",
      },
    });

    function getExtension(url) {
      const fileName = url.split(".");
      return fileName[fileName.length - 1];
    }

    function isImage(url) {
      const extension = getExtension(url);
      switch (extension.toLowerCase()) {
        case "jpg":
        case "webp":
        case "png":
        case "gif":
        case "bmp":
          return true;
        default:
          return false;
      }
    }

    function isVideo(url) {
      var ext = getExtension(url);
      switch (ext.toLowerCase()) {
        case "avi":
        case "mpeg":
        case "webm":
        case "mp4":
        case "mov":
          return true;
        default:
          return false;
      }
    }

    const deleteButton = authenticated &&
      JSON.parse(localStorage.getItem("userId")) === userId && (
        <DeleteButton gifId={gifId} />
      );

    const editButton = authenticated &&
      JSON.parse(localStorage.getItem("userId")) === userId && (
        <EditGif gifId={gifId} title={title} />
      );

    const gifMarkup = User ? (
      <Fragment>
        <div className={classes.header}>
          <CardHeader
            avatar={<Avatar src={User.avatar} alt={altAvatar} />}
            title={title}
            subheader={
              "par " +
              User.firstName +
              " " +
              User.lastName +
              " - " +
              dayjs(createdAt).fromNow()
            }
          />
          <CardActions disableSpacing>
            {editButton}
            {deleteButton}
          </CardActions>
        </div>
        <Link
          to={"/gif/" + gifId}
          onClick={this.handleClick}
          className={classes.mediaAlign}
        >
          {isImage(url) ? (
            <img src={url} alt={altImg} id={gifId} className={classes.media} />
          ) : isVideo(url) ? (
            <video
              controls
              autoPlay
              loop
              muted
              src={url}
              className={classes.media}
            />
          ) : (
            <p>Impossible de charger le média</p>
          )}
        </Link>
        <CardActions disableSpacing>
          <LikeButton gifId={gifId} />
          <span>{Likes.length}</span>
          <Link
            to={"/gif/" + gifId}
            onClick={this.handleClick}
            className={classes.mediaAlign}
          >
            <ChatBubbleOutlineIcon id={gifId} className={classes.button} />
          </Link>
          <span>{Comments.length}</span>
        </CardActions>
      </Fragment>
    ) : (
      <Fragment>Impossible d'afficher le GIF</Fragment>
    );

    return <Fragment>{gifMarkup}</Fragment>;
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
