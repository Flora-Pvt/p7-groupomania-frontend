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
  form: {
    [theme.breakpoints.down('sm')]: {
      width: "100%",
      margin:"auto"
    }},
});

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const {
      classes,
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid container spacing={10} className={classes.form}>
        <Grid item className={classes.title}>
          <Typography variant="h4">Log in</Typography>
        </Grid>
        <Grid item>
          <form
            onSubmit={this.handleSubmit}
            noValidate
            className={classes.form}
          >
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
            <p>
              Don't have an account ? login{" "}
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
