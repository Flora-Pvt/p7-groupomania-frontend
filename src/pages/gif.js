import React, { Component } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Gif from "../components/gif/Gif";
import Comment from "../components/gif/Comment";
import AddComment from "../components/gif/AddComment";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";

// Redux
import { connect } from "react-redux";
import { getComments } from "../redux/actions/gifActions";

const styles = (theme) => ({
  ...theme.styling,
});

export class OneGif extends Component {
  componentDidMount() {
    let gifId = this.props.match.params.id;
    this.props.getComments(gifId);
  }

  render() {
    const { classes } = this.props;
    let gifId = Number(this.props.match.params.id);
    let index = this.props.gifs.gifs.findIndex((gif) => gif.gifId === gifId);

    if (this.props.gifs.gifs[index] === undefined) {
      window.location.href = "/";
      return null

    } else {
      const gif = this.props.gifs.gifs[index];

      const gifMarkup = gif && <Gif gif={gif} key={gif.gifId} />;

      return (
        <Card className={classes.card}>
          {gifMarkup}
          <AddComment gifId={gif.gifId} />
          <Comment comments={gif.Comments} />
        </Card>
      );
    }
  }
}

OneGif.propTypes = {
  useParams: PropTypes.func.isRequired,
  gifs: PropTypes.object.isRequired,
  getComments: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapActionsToProps = {
  useParams,
  getComments,
};

const mapStateToProps = (state) => ({
  gifs: state.gifs,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(OneGif));
