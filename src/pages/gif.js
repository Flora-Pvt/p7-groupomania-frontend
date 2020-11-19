import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import LikeButton from "../components/gif/LikeButton";
import Comment from "../components/gif/Comment";
import CommentForm from "../components/gif/CommentForm";

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardActions from "@material-ui/core/CardActions";

// Redux
import { connect } from "react-redux";
import { getComments } from "../redux/actions/gifActions";

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
  actions: {
    marginLeft: "5%",
  },
});

export class OneGif extends Component {
  render() {
    const {
      classes,
      gif: { gifId, title, url, createdAt, User, Comments, Likes, loading },
    } = this.props;    

    
    if (Comments) { this.props.getComments(gifId)}

    const gifMarkup = loading ? (
      <p>Chargement...</p>
    ) : User ? (
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar src={User.avatar} alt="avatar" />}
          title={title}
          subheader={
            "@" +
            User.firstName +
            User.lastName +
            " - " +
            dayjs(createdAt).format("le DD.MM.YYYY à H:mm")
          }
          color="inherit"
        />
        <img src={url} alt="GIF" className={classes.media} />
        <CardActions className={classes.actions}>
          <LikeButton />
          <span>{Likes.length}</span>
        </CardActions>
        <CommentForm gifId={gifId} />
        <Comment comments={Comments} />
      </Card>
    ) : (
      <p>Impossible de charger le GIF.</p>
    );

    return <Container>{gifMarkup}</Container>;
  }
}

OneGif.propTypes = {
  gif: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  //gifId: state.gifs.gifId,
  gif: state.gifs.gif,
});

const mapActionsToProps = {
  getComments,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(OneGif));
