import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import EditUser from "../components/user/EditUser";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

// Redux
import { connect } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

const styles = {
  container: {
    maxWidth: "60%",
    margin: "auto",
  },
  avatar: {
    width: 70,
    height: 70,
  },
  buttons: {
    justifyContent: "space-between",
  },
};

export class User extends Component {
  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        credentials: {
          userId,
          firstName,
          lastName,
          avatar,
          officePosition,
          email,
        },
        loading,
        authenticated,
      },
    } = this.props;

    let userMarkup = !loading ? (
      authenticated ? (
        <Card key={userId} className={classes.container}>
          <CardHeader
            avatar={
              <Avatar src={avatar} alt="avatar" className={classes.avatar} />
            }
            title={firstName + " " + lastName}
            subheader={officePosition + " - " + email}
          />
          <CardActions className={classes.buttons}>
            <IconButton title="Se déconnecter" onClick={this.handleLogout}>
              <ExitToAppIcon aria-label="Se déconnecter" color="secondary" />
            </IconButton>
            <EditUser />
          </CardActions>
        </Card>
      ) : (
        <Paper>
          <Typography variant="body2" align="center">
            Impossible de trouver l'utilisateur, merci de vous connecter à
            nouveau
          </Typography>
          <div>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Se connecter
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              S'inscrire
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>Chargement...</p>
    );
    return userMarkup;
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
