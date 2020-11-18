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
import { getComments } from "../redux/network/gifNetwork";

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
marginLeft: "5%"
  }
});

export class OneGif extends Component {
  componentDidMount = () => {
    console.log(this.props);
    this.props.getComments(this.props.gif.gifId);
  };

  render() {
    const {
      classes,
      gif: {
        gifId,
        title,
        url,
        createdAt,
        User: { avatar, firstName, lastName },
        Comments,
        Likes,
        loading,
      },
    } = this.props;

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
        <CardActions className={classes.actions}>
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
  gifId: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  gif: state.gifs.gif,
});

const mapActionsToProps = {
  getComments,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(OneGif));
