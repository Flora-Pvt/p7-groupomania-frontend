import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Logo from "../images/icon-transparent.png";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

// Redux
import { connect } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.styling,
});

class signup extends Component {
  constructor() {
    super();
    this.state = {
      avatar: "",
      fileInput: React.createRef(),
      fileOutput: React.createRef(),
      firstName: "",
      lastName: "",
      officePosition: "",
      email: "",
      password: "",
      errors: "",
    };
  }

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
    if (
      !this.state.avatar ||
      this.state.avatar === undefined ||
      !this.state.firstName ||
      this.state.firstName === undefined ||
      !this.state.lastName ||
      this.state.lastName === undefined ||
      !this.state.officePosition ||
      this.state.officePosition === undefined ||
      !this.state.email ||
      this.state.email === undefined ||
      !this.state.password ||
      this.state.password === undefined
    ) {
      this.setState({ errors: "Vérifiez les données saisies" });
    } else {
      this.setState({ errors: "" });
      const image = this.state.avatar;
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
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={10} className={classes.form}>
        <Grid item className={classes.title}>
          <Typography variant="h4">Sign up</Typography>
        </Grid>
        <Grid item>
          <form
            encType="multipart/form-data"
            onSubmit={this.handleSubmit}
            noValidate
            className={classes.form}
          >
            <span style={{ color: "red" }}>{this.state.errors}</span>
            <Grid container direction="row" justify="flex-start">
              <input
                ref={this.state.fileInput}
                name="image"
                type="file"
                label="Image"
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
                title="Ajouter l'image du GIF"
                onClick={this.handleAddImage}
                className={classes.addAvatarButton}
              >
                <AddPhotoAlternateIcon color="secondary" />
              </IconButton>
            </Grid>
            <TextField
              required
              className={classes.field}
              id="firstName"
              name="firstName"
              type="text"
              label="Prénom"
              variant="outlined"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <TextField
              required
              className={classes.field}
              id="lastName"
              name="lastName"
              type="text"
              label="Nom"
              variant="outlined"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <TextField
              required
              className={classes.field}
              id="officePosition"
              name="officePosition"
              type="text"
              label="Rôle dans l'entreprise"
              variant="outlined"
              value={this.state.officePosition}
              onChange={this.handleChange}
            />
            <TextField
              required
              className={classes.field}
              id="email"
              name="email"
              type="email"
              label="Adresse mail"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              required
              className={classes.field}
              id="password"
              name="password"
              type="password"
              label="Mot de passe"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleChange}
            />
<<<<<<< Updated upstream
            <Button type="submit" variant="contained" color="primary">
=======
            <span style={{ color: "red" }}>
              {this.state.errors["password"]}
            </span>
            <Button type="submit" onClick={this.handleSubmit} variant="contained" color="primary">
>>>>>>> Stashed changes
              Signup
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
  signupUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  signupUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(signup));
