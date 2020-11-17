import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import LikeButton from "../components/gif/LikeButton";
import Comment from "../components/gif/Comment";
import PostComment from "../components/gif/PostComment";

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.styling,
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    maxWidth: 800,
    margin: "auto",
  },
  media: {
    alignSelf: "center",
    maxWidth: 800,
  },
});

export class OneGif extends Component {
  render() {
    const { classes } = this.props;
    const {
      gif: {
        loading,
        gifId,
        title,
        url,
        createdAt,
        Likes,
        Comments,
        User: { firstName, lastName, avatar },
      },
    } = this.props.gifs;

    const gifMarkup = !loading ? (
      <Fragment>
        <CardHeader
          avatar={<Avatar src={avatar} alt="avatar" />}
          title={title}
          subheader={
            "@" +
            firstName +
            lastName +
            " - " +
            dayjs(createdAt).format("le DD.MM.YYYY à H:mm")
          }
          color="inherit"
        />
        <img src={url} alt="GIF" className={classes.media} />
        <CardActions>
          <LikeButton />
          {Likes ? <span>{Likes.length}</span> : <span>0</span>}
        </CardActions>
        <PostComment gifId={gifId} />
        <Comment comments={Comments} />
      </Fragment>
    ) : (
      <p>Chargement...</p>
    );
    return <Card className={classes.root}>{gifMarkup}</Card>;
  }
}

OneGif.propTypes = {
  gif: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  gif: state.gifs.gif,
});

export default connect(mapStateToProps)(withStyles(styles)(OneGif));
