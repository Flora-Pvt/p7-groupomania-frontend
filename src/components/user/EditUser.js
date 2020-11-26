import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import Logo from "../../images/icon-transparent.png";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
import { updateUser } from "../../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.styling,
});

export class userEdit extends Component {
  state = {
    avatar: "",
    fileInput: React.createRef(),
    fileOutput: React.createRef(),
    officePosition: "",
    errors: "",
    open: false,
  };

  mapUserDetailsToState = (credentials) => {
    this.setState({
      avatar: credentials.avatar ? credentials.avatar : "",
      officePosition: credentials.officePosition
        ? credentials.officePosition
        : "",
    });
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };

  handleClose = () => {
    this.setState({ open: false, errors: "" });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAddImage = () => {
    const fileInput = this.state.fileInput.current;
    fileInput.click();
  };

  handleImageLoaded = (event) => {
    const fileOutput = this.state.fileOutput.current;
    fileOutput.src = URL.createObjectURL(event.target.files[0]);
    this.setState({
      avatar: event.target.files[0],
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.officePosition || this.state.officePosition === undefined) {
      this.setState({ errors: "Vérifiez les données saisies" });
    } else {
      const image = this.state.avatar;
      const officePosition = this.state.officePosition;
      const userDetails = new FormData();
      userDetails.append("image", image);
      userDetails.append("officePosition", JSON.stringify(officePosition));
      this.props.updateUser(userDetails);
      this.handleClose();
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <IconButton
          title="Editer votre profil"
          onClick={this.handleOpen}
          className={classes.button}
        >
          <EditIcon color="secondary" />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Modifier vos informations</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
              <span style={{ color: "red" }}>{this.state.errors}</span>
              <div className={classes.flexEditAvatar}>
                <input
                  ref={this.state.fileInput}
                  name="image"
                  type="file"
                  label="Image d'avatar"
                  hidden="hidden"
                  accept="image/*"
                  files={this.state.avatar}
                  onChange={this.handleImageLoaded}
                />
                {this.state.fileOutput.src !== undefined ? (
                  <img
                    ref={this.state.fileOutput}
                    alt="avatar miniature"
                    className={classes.avatar}
                  />
                ) : (
                  <img
                    ref={this.state.fileOutput}
                    src={Logo}
                    alt="logo de groupomania représenté par une planète"
                    className={classes.avatar}
                  />
                )}
                <IconButton
                  title="Editer votre avatar"
                  onClick={this.handleAddImage}
                  className={classes.addAvatarButton}
                >
                  <EditIcon color="secondary" />
                </IconButton>
              </div>
              <TextField
                required
                name="officePosition"
                type="text"
                label="Rôle dans l'entreprise"
                className={classes.field}
                value={this.state.officePosition}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Annuler
            </Button>
            <Button type="submit" onClick={this.handleSubmit} color="secondary">
              Sauvegarder
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

userEdit.propTypes = {
  updateUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

const mapActionsToProps = { updateUser };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(userEdit));
