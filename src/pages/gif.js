import React, { Component } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Gif from "../components/gif/Gif";
import Comment from "../components/gif/Comment";
import CommentForm from "../components/gif/CommentForm";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";

// Redux
import { connect } from "react-redux";
import { getComments } from "../redux/actions/gifActions";

const styles = (theme) => ({
  ...theme.styling,
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    maxWidth: 700,
    margin: "auto",
  },
});



export class OneGif extends Component {
  componentDidMount() {
    let gifId = this.props.match.params.id;
    this.props.getComments(gifId);
  }
  render() {
    let gifId = this.props.match.params.id;
    let index = this.props.gifs.gifs.findIndex((gif) => gif.gifId == gifId);

    const { classes } = this.props;
    const gif = this.props.gifs.gifs[index];

    const gifMarkup = gif && <Gif gif={gif} key={gif.gifId} />;

    return (
      <Card className={classes.root}>
        {gifMarkup}
        <CommentForm gifId={gif.gifId} />
        <Comment comments={gif.Comments} />
      </Card>
    );
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
