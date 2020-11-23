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
import { postComment } from "../../redux/actions/gifActions";

const styles = (theme) => ({
  ...theme.styling,
});

export class AddComment extends Component {
  state = {
    content: "",
    errors: ""
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.content || this.state.content === undefined) {
      this.setState({ errors: "Vérifiez les données saisies" });
    } else {
      const gifId = this.props.gifId;
      const userId = JSON.parse(localStorage.getItem("userId"));
      const content = this.state.content;

      const newComment = {
        userId: userId,
        content: content,
      };

      this.props.postComment(gifId, newComment);

      this.setState({
        content: "",
        errors: ""
      });
    }
  };

  render() {
    const { classes, authenticated } = this.props;
    const commentFormMarkup = authenticated ? (
      <Fragment>
        <CardContent className={classes.commentField}>
          <form encType="multipart/form-data" noValidate>
          <span style={{ color: "red" }}>{this.state.errors}</span>
            <TextField
              required
              name="content"
              type="text"
              label="Poster votre commentaire"
              value={this.state.content}
              onChange={this.handleChange}
              fullWidth
            />
          </form>
        </CardContent>
        <CardActions className={classes.commentButton}>
          <Button onClick={this.handleSubmit} color="secondary">
            Poster
          </Button>
        </CardActions>
      </Fragment>
    ) : null;
    return commentFormMarkup;
  }
}

AddComment.propTypes = {
  gifId: PropTypes.number.isRequired,
  authenticated: PropTypes.bool.isRequired,
  postComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps, { postComment })(
  withStyles(styles)(AddComment)
);
