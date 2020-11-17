import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
import { postComment } from "../../redux/network/gifNetwork";

const styles = (theme) => ({
  ...theme.styling,
  field: {
    paddingBottom: 0,
    width: "90%",
    alignSelf: "center",
  },
  buttons: {
    justifyContent: "flex-end",
    paddingTop: 0,
    width: "95%",
  }
});

export class PostComment extends Component {
  state = {
    content: "",
    open: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const gifId = this.props.gifId;
    const userId = JSON.parse(localStorage.getItem("userId"));
    const content = this.state.content;

    const newComment = {
      userId: userId,
      content: content,
    };

    this.props.postComment(gifId, newComment);
  };

  render() {
    const { classes, authenticated } = this.props;
    const commentFormMarkup = authenticated ? (
      <Fragment>
          <CardContent className={classes.field}>
            <form encType="multipart/form-data">
              <TextField
                name="content"
                type="text"
                label="Poster votre commentaire"
                value={this.state.content}                
                onChange={this.handleChange}            
                fullWidth
              />
            </form>
          </CardContent>
          <CardActions className={classes.buttons}>
            <Button onClick={this.handleSubmit} color="secondary">
              Poster
            </Button>
          </CardActions>
      </Fragment>
    ) : null;
    return commentFormMarkup;
  }
}

PostComment.propTypes = {
  gifId: PropTypes.number.isRequired,
  authenticated: PropTypes.bool.isRequired,
  postComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  UI: state.UI,
});

export default connect(mapStateToProps, { postComment })(
  withStyles(styles)(PostComment)
);
