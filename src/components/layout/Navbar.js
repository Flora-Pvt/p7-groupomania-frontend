import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";
import PostGif from "../gif/PostGif";

// Material UI
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";

import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

export class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <AppBar position="fixed">
        <ToolBar className="nav-container">
          {authenticated ? (
            <Fragment>
              <PostGif />
              <Link to="/">
                <MyButton tip="Accueil">
                  <HomeIcon color="inherit" />
                </MyButton>
              </Link>
              <MyButton tip="Notifications">
                <Notifications color="inherit" />
              </MyButton>
            </Fragment>
          ) : (
            <Fragment>
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/signup" color="inherit">
                Signup
              </Button>
            </Fragment>
          )}
        </ToolBar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Navbar);
