import React, { Component } from "react";
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
      <StarIcon color="secondary" onClick={this.unlikeGif} className={classes.star} />
    ) : (
      <StarBorderIcon onClick={this.likeGif} className={classes.star} />
    );
    return (
      <IconButton
        title="Ajouter ou retirer une étoile"
        onClick={this.handleOpen}
        className={classes.button}
      >
        {likeButton}
      </IconButton>
    );
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
