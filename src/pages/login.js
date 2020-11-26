import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.styling,
});

class login extends Component {
  constructor() {
    super();
    this.state = {
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

  handleSubmit = (event) => {
    event.preventDefault();
    if (
      !this.state.email ||
      this.state.email === undefined ||
      !this.state.password ||
      this.state.password === undefined
    ) {
      this.setState({ errors: "Vérifiez les données saisies" });
    } else {
      const userData = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.loginUser(userData, this.props.history);
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={10} className={classes.form}>
        <Grid item className={classes.title}>
          <Typography variant="h4">Connexion</Typography>
        </Grid>
        <Grid item>
          <form
            onSubmit={this.handleSubmit}
            noValidate
            className={classes.form}
          >
            <span style={{ color: "red" }}>{this.state.errors}</span>
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
            <Button type="submit" onClick={this.handleSubmit} variant="contained" color="primary">
              Se connecter
            </Button>
            <p>
              Vous n'avez pas de compte ? Inscrivez vous{" "}
              <Link to="/signup" className={classes.link}>
                ici
              </Link>
            </p>
          </form>
        </Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
