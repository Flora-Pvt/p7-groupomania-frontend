import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import MyButton from "../utils/MyButton";
import PropTypes from "prop-types";

// Material UI
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

// Redux
import { connect } from "react-redux";
import { likeGif, unlikeGif } from "../redux/network/gifNetwork";

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
    const {
      user: { authenticated },
    } = this.props;

    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Aimer">
          <StarBorderIcon color="primary" />
        </MyButton>
      </Link>
    ) : this.likedGif() ? (
      <MyButton tip="Ne plus aimer" onClick={this.unlikeGif}>
        <StarIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Aimer" onClick={this.likeGif}>
        <StarBorderIcon color="primary" />
      </MyButton>
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
});

const mapActionsToProps = {
  likeGif,
  unlikeGif,
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
