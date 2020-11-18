import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Material UI
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
// Redux
import { connect } from "react-redux";
import { likeGif, unlikeGif } from "../../redux/network/gifNetwork";

export class LikeButton extends Component {
  likedGif = () => {
    console.log(this.props.user.likes)
    console.log(this.props.gifId)
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
    console.log(this.likedGif())
    const likeButton = this.likedGif() ? (
        <StarIcon color="secondary" title="Ne plus aimer" onClick={this.unlikeGif}/>
    ) : (
        <StarBorderIcon title="Aimer" onClick={this.likeGif}/>
    );
    return <Fragment>{likeButton}</Fragment>;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  gifId: PropTypes.number.isRequired,
  likeGif: PropTypes.func.isRequired,
  unlikeGif: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  gifId: state.gifs.gif.gifId
});

const mapActionsToProps = {
  likeGif,
  unlikeGif,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
