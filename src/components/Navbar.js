import React, { Component } from "react";
import { Link } from 'react-router-dom';

// Material UI
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import Button from "@material-ui/core/Button";

export class Navbar extends Component {
  render() {
    return (
      <AppBar position="fixed">
        <ToolBar className="nav-container">
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
          <Button component={Link} to="/signup" color="inherit">
            Signup
          </Button>
        </ToolBar>
      </AppBar>
    );
  }
}

export default Navbar;
