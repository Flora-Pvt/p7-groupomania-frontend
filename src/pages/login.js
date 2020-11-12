import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";
import AppIcon from "../images/icon-transparent.png";

// Material UI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
    marginLeft: -50,
  },
  media: {
    width: 50,
  },
  root: {
    width: "40ch",
  },
  field: {
    width: "40ch",
    marginBottom: 20,
  },
  link: {
    textDecoration: "underline",
  },
};

export class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    axios
      .post("http://localhost:3000/api/gifs/", userData)
      .then((res) => {
        console.log(res.data);
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;

    return (
      <Grid container spacing={10} className={classes.form}>
        <Grid item className={classes.flex}>
          <img
            src={AppIcon}
            alt="logo d'une planète"
            className={classes.media}
          />
          <Typography variant="h4">Log in</Typography>
        </Grid>
        <Grid item>
          <form
            onSubmit={this.handleSubmit}
            noValidate
            className={classes.root}
          >
            <TextField
              className={classes.field}
              required
              id="outlined-required"
              label="Adresse mail"              
              variant="outlined"
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              className={classes.field}
              id="outlined-password-input"
              label="Mot de passe*"
              type="password"
              autoComplete="current-password"
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
              disabled={loading}
              className={classes.button}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <p>
              Dont have an account ? sign up{" "}
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(login);
