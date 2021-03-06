import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import IconGroupomania from "../../images/iconWhite.svg";
import AddGif from "../gif/AddGif";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.styling,
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
                <h1>
                  <img
                    edge="start"
                    src={IconGroupomania}
                    alt="logo d'une planète suivi du texte Groupomania"
                    className={classes.logo}
                  />
                </h1>
              </Link>
              <div className={classes.row} edge="end">
                <Link to="/user" aria-label="chemin vers la page de profil">
                  <Avatar title="Voir mon profil" src={avatar} alt="avatar" />
                </Link>
                <AddGif />
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <h1>
                <img
                  edge="start"
                  src={IconGroupomania}
                  alt="logo d'une planète suivi du texte Groupomania"
                  className={classes.logo}
                />
              </h1>
              <div edge="end">
                <Button component={Link} to="/login" color="inherit">
                  Connexion
                </Button>
                <Button component={Link} to="/signup" color="inherit">
                  Inscription
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
