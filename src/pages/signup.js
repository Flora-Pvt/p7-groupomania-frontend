import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import { connect } from "react-redux";
import { signupUser } from "../redux/network/userNetwork";

const styles = (theme) => ({
  ...theme.styling,
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      image: "",
      firstName: "",
      lastName: "",
      officePosition: "",
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidUpdate(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImageLoaded = (event) => {
    this.setState({
      image: event.target.files[0],
    });
  };

  handleAddImage = () => {
    const fileInput = document.getElementById("image");
    fileInput.click();
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const image = this.state.image;
    const firstName = JSON.stringify(this.state.firstName);
    const lastName = JSON.stringify(this.state.lastName);
    const officePosition = JSON.stringify(this.state.officePosition);
    const email = JSON.stringify(this.state.email);
    const password = JSON.stringify(this.state.password);

    const newUserData = new FormData();
    newUserData.append("image", image);
    newUserData.append("firstName", firstName);
    newUserData.append("lastName", lastName);
    newUserData.append("officePosition", officePosition);
    newUserData.append("email", email);
    newUserData.append("password", password);

    this.props.signupUser(newUserData, this.props.history);
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container spacing={10} className={classes.form}>
        <Grid item className={classes.flex}>
          <Typography variant="h4">Sign up</Typography>
        </Grid>
        <Grid item>
          <form
            encType="multipart/form-data"
            onSubmit={this.handleSubmit}
            className={classes.root}
          >
            <input
              id="image"
              name="image"
              type="file"
              label="Image"
              hidden="hidden"
              accept="image/*"
              files={this.state.image}
              onChange={this.handleImageLoaded}
            />
            <IconButton
              tip="Ajouter l'image du GIF"
              onClick={this.handleAddImage}
              className={classes.addImage}
            >
              <AddPhotoAlternateIcon color="primary" />
            </IconButton>
            <TextField
              className={classes.field}
              id="firstName"
              name="firstName"
              type="text"
              label="Prénom*"
              variant="outlined"
              helperText={errors.firstName}
              error={errors.firstName ? true : false}
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <TextField
              className={classes.field}
              id="lastName"
              name="lastName"
              type="text"
              label="Nom*"
              variant="outlined"
              helperText={errors.lastName}
              error={errors.lastName ? true : false}
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <TextField
              className={classes.field}
              id="officePosition"
              name="officePosition"
              type="text"
              label="Rôle dans l'entreprise*"
              variant="outlined"
              helperText={errors.officePosition}
              error={errors.officePosition ? true : false}
              value={this.state.officePosition}
              onChange={this.handleChange}
            />
            <TextField
              className={classes.field}
              id="email"
              name="email"
              type="email"
              label="Adresse mail*"
              variant="outlined"
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              className={classes.field}
              id="password"
              name="password"
              type="password"
              label="Mot de passe*"
              variant="outlined"
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customErrors}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              className={classes.button}
            >
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <p>
              You have an account ? sign up{" "}
              <Link to="/signup" className={classes.link}>
                here
              </Link>
            </p>
          </form>
        </Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  signupUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(signup));
