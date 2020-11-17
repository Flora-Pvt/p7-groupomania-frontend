import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

// Material UI
import TextField from "@material-ui/core/TextField";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
import { postComment, clearErrors } from "../../redux/network/gifNetwork";

const styles = (theme) => ({
  ...theme.styling,
  buttons: {
    justifyContent: "flex-end"
  }
});

export class PostComment extends Component {
  state = {
    content: "",
    errors: {},
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
     if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ content: "", open: false, errors: {} });
    }
  }

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
    const { errors } = this.state;
    const { classes, authenticated, UI: {loading} } = this.props;
    const commentFormMarkup = authenticated ? (
      <Fragment>
          <CardContent>
            <form encType="multipart/form-data">
              <TextField
                name="content"
                type="text"
                label="Poster votre commentaire"
                value={this.state.content}                
                onChange={this.handleChange}
                error={errors.comment ? true : false}
                helperText={errors.comment}                
                fullWidth
              />
            </form>
          </CardContent>
          <CardActions className={classes.buttons}>
            <Button onClick={this.handleSubmit} color="primary">
              Enregistrer
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
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
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  UI: state.UI,
});

export default connect(mapStateToProps, { postComment, clearErrors })(
  withStyles(styles)(PostComment)
);
