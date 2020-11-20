import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import IconGroupomania from "../../images/iconWhite.svg";
import GifForm from "../gif/GifForm";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.styling,
  logo: {
    [theme.breakpoints.down('sm')]: {
      maxHeight: 20,
    }},
});

export class Navbar extends Component {
  render() {
    const {
      classes,
      authenticated,
      user: {
        credentials: { avatar },
      },
    } = this.props;
    return (
      <AppBar position="fixed">
        <ToolBar className={classes.flexNavbar}>
          {authenticated ? (
            <Fragment>
              <Link to="/" aria-label="chemin vers la page d'accueil">
                <img
                  edge="start"
                  src={IconGroupomania}
                  alt="logo d'une planète suivi du texte Groupomania"
                  className={classes.logo}
                />
              </Link>
              <div className={classes.row} edge="end">
                <Link to="/user" aria-label="chemin vers la page de profil">
                  <Avatar title="Voir mon profil" src={avatar} alt="avatar" />
                </Link>
                <GifForm />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <img
                edge="start"
                src={IconGroupomania}
                alt="logo d'une planète suivi du texte Groupomania"
                className={classes.logo}
              />
              <div edge="end">
                <Button component={Link} to="/login" color="inherit">
                  Login
                </Button>
                <Button component={Link} to="/signup" color="inherit">
                  Signup
                </Button>
              </div>
            </Fragment>
          )}
        </ToolBar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  user: state.user,
});

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
