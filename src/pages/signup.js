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
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      fileInput: React.createRef(),
      fileOutput: React.createRef(),
      fields: {},
      errors: {},
    };
  }

  handleChange = (field, event) => {
    let fields = this.state.fields;
    fields[field] = event.target.value;
    this.setState({ fields });
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

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!this.state.avatar || this.state.avatar === undefined) {
      formIsValid = false;
      errors["avatar"] = "Vérifiez l'image ajoutée";
    }
    if (
      !fields["firstName"] ||
      typeof fields["firstName"] === undefined ||
      !fields["firstName"].match(
        /^([a-zA-Z\u0080-\u024F]+(?: |-| |'))*[a-zA-Z\u0080-\u024F]*$/
      )
    ) {
      formIsValid = false;
      errors["firstName"] = "Vérifiez les données saisies";
    }
    if (
      !fields["lastName"] ||
      typeof fields["lastName"] === undefined ||
      !fields["lastName"].match(
        /^([a-zA-Z\u0080-\u024F]+(?: |-| |'))*[a-zA-Z\u0080-\u024F]*$/
      )
    ) {
      formIsValid = false;
      errors["lastName"] = "Vérifiez les données saisies";
    }
    if (
      !fields["officePosition"] ||
      typeof fields["officePosition"] === undefined
    ) {
      formIsValid = false;
      errors["officePosition"] = "Vérifiez les données saisies";
    }
    if (
      !fields["email"] ||
      typeof fields["email"] === undefined ||
      !fields["email"].match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      formIsValid = false;
      errors["email"] = "Votre email doit être valide";
    }
    if (
      !fields["password"] ||
      typeof fields["password"] === undefined ||
      !fields["password"].match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,50})/)
    ) {
      formIsValid = false;
      errors["password"] =
        "Le mot de passe doit être d'au moins 8 caractères, comporter une majuscule, une minuscule et un chiffre.";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.avatar)
    if (this.handleValidation()) {
      this.setState({ errors: "" });

      const newUserData = new FormData();
      newUserData.append("image", this.state.avatar);
      newUserData.append(
        "firstName",
        JSON.stringify(this.state.fields["firstName"])
      );
      newUserData.append(
        "lastName",
        JSON.stringify(this.state.fields["lastName"])
      );
      newUserData.append(
        "officePosition",
        JSON.stringify(this.state.fields["officePosition"])
      );
      newUserData.append("email", JSON.stringify(this.state.fields["email"]));
      newUserData.append(
        "password",
        JSON.stringify(this.state.fields["password"])
      );

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
            onSubmit={this.handleSubmit.bind(this)}
            noValidate
            className={classes.form}
          >
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
            <span className={classes.errors}>{this.state.errors["avatar"]}</span>
            <TextField
              required
              id="firstName"
              name="firstName"
              type="text"
              label="Prénom"
              variant="outlined"
              value={this.state.fields["firstName"]}
              onChange={this.handleChange.bind(this, "firstName")}
            />
            <span className={classes.errors}>
              {this.state.errors["firstName"]}
            </span>
            <TextField
              required
              id="lastName"
              name="lastName"
              type="text"
              label="Nom"
              variant="outlined"
              value={this.state.fields["lastName"]}
              onChange={this.handleChange.bind(this, "lastName")}
            />
            <span className={classes.errors}>
              {this.state.errors["lastName"]}
            </span>
            <TextField
              required
              id="officePosition"
              name="officePosition"
              type="text"
              label="Rôle dans l'entreprise"
              variant="outlined"
              value={this.state.fields["officePosition"]}
              onChange={this.handleChange.bind(this, "officePosition")}
            />
            <span className={classes.errors}>
              {this.state.errors["officePosition"]}
            </span>
            <TextField
              required
              id="email"
              name="email"
              type="email"
              label="Adresse mail"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleChange.bind(this, "email")}
            />
            <span className={classes.errors}>{this.state.errors["email"]}</span>
            <TextField
              required
              id="password"
              name="password"
              type="password"
              label="Mot de passe"
              variant="outlined"
              value={this.state.fields["password"]}
              onChange={this.handleChange.bind(this, "password")}
            />
            <span className={classes.errors}>
              {this.state.errors["password"]}
            </span>           
            <Button type="submit" onClick={this.handleSubmit} variant="contained" color="primary">
              Signup
            </Button>
            <p>
              You have an account ? login{" "}
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
