import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import AppIcon from "../../images/icon-transparent.png";
import LikeButton from "./LikeButton";
import Comment from "./Comment";

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import ChatIcon from "@material-ui/icons/Chat";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

// Redux
import { connect } from "react-redux";
import { getOneGif } from "../../redux/network/gifNetwork";

const styles = (theme) => ({
  ...theme.styling,
  root: {
    marginBottom: 10,
  },
  media: {
    minHeight: 400,
  },
});

export class GifDialog extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.props.getOneGif(this.props.gifId);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      gif: { userId, title, url, createdAt, Likes, Comments },
      UI: { loading },
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

    const dialogMarkup = loading ? (
      <CircularProgress size={200} thickness={2} />
    ) : (
      <Card>
        <CardHeader
          avatar={
            <Avatar src={AppIcon} alt="avatar" className={classes.avatar} />
          }
          title={title}
          subheader={
            "@" +
            userId +
            " - " +
            dayjs(createdAt).format("le DD.MM.YYYY à H:mm")
          }
          component={Link}
          to={"/auth/" + userId}
          color="inherit"
        />
        <CardMedia className={classes.media} image={url} />
        <Comment comments={Comments} />
      </Card>
    );

    return (
      <Fragment>
        <MyButton
          tip="Voir le GIF"
          onClick={this.handleOpen}
          className={classes.button}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          className={classes.root}
          fullWidth
          maxWidth="sm"
        >
          <DialogContent>{dialogMarkup}</DialogContent>
          <DialogActions>
            <LikeButton />
            {Likes ? <span>{Likes.length}</span> : <span>0</span>}
            {commentButton}
            {Comments ? <span>{Comments.length}</span> : <span>0</span>}
            <Button onClick={this.handleClose} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

GifDialog.propTypes = {
  getOneGif: PropTypes.func.isRequired,
  gifId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  gif: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  gif: state.gifs.gif,
  UI: state.UI,
});

const mapActionsToProps = {
  getOneGif,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(GifDialog));
