import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
// Redux
import { connect } from "react-redux";
import { likeGif, unlikeGif } from "../../redux/actions/gifActions";

const styles = (theme) => ({
  ...theme.styling,
});

export class LikeButton extends Component {
  likedGif = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find((like) => like.gifId === this.props.gifId)
    ) {
      return true;
    } else return false;
  };

  likeGif = () => {
    this.props.likeGif(this.props.gifId);
  };

  unlikeGif = () => {
    this.props.unlikeGif(this.props.gifId);
  };

  render() {
    const { classes } = this.props;

    const likeButton = this.likedGif() ? (
      <IconButton
        onClick={this.unlikeGif}
        title="Retirer une étoile"
        className={classes.button}
      >
        <StarIcon color="secondary" className={classes.star} />
      </IconButton>
    ) : (
      <IconButton
        onClick={this.likeGif}
        title="Ajouter une étoile"
        className={classes.button}
      >
        <StarBorderIcon className={classes.star} />
      </IconButton>
    );
    return <Fragment>{likeButton}</Fragment>;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  gifId: PropTypes.number.isRequired,
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
)(withStyles(styles)(LikeButton));
