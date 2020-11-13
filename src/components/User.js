import React, { Component } from "react";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon-transparent.png";

// Material UI
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import StarsIcon from "@material-ui/icons/Stars";
import MailIcon from "@material-ui/icons/Mail";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

// Redux
import { connect } from "react-redux";
import { logoutUser } from "../redux/network/userNetwork";

const styles = {};

export class User extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { userId, firstName, lastName, officePosition, email },
        loading,
        authenticated
      },
    } = this.props;


      let userMarkup = !loading ? (
        authenticated ? (
      <Card key={userId} className={classes.root}>
        <CardHeader
          avatar={
            <Avatar src={AppIcon} alt="avatar" className={classes.avatar} />
          }
          action={
            <IconButton aria-label="settings">
              <MoreHorizIcon />
            </IconButton>
          }
          title={firstName + " " + lastName}
          subheader={officePosition + " " + email}
          component={Link}
          to={`/auth/${userId}`}
          color="inherit"
        />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <StarsIcon />
          </IconButton>
          <IconButton aria-label="share">
            <MailIcon />
          </IconButton>
        </CardActions>
      </Card>
    ): (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <p>Loading...</p>
  );
    return userMarkup
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { logoutUser };

User.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(User));
