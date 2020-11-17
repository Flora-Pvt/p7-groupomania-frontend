import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppIcon from "../images/icon-transparent.png";
import EditUser from "../components/user/EditUser";
import MyButton from "../utils/MyButton";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

// Redux
import { connect } from "react-redux";
import { logoutUser } from "../redux/network/userNetwork";

const styles = (theme) => ({
  ...theme.styling,
  container: {
    maxWidth: "60%",
    margin: "auto"
  },
  avatar: {
    width: 70,
    height: 70
  },
  actions: {
    justifyContent: "space-between",
  },
});

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
            className={classes.cardheader}
            avatar={
              avatar ? (
                <Avatar src={avatar} alt="avatar" className={classes.avatar} />
              ) : (
                <Avatar src={AppIcon} alt="avatar" className={classes.avatar} />
              )
            }
            title={firstName + " " + lastName}
            subheader={officePosition + " - " + email}
            color="inherit"
          />
          <CardActions className={classes.actions}>
            <MyButton tip="Se déconnecter" onClick={this.handleLogout}>
              <ExitToAppIcon aria-label="Se déconnecter" color="secondary" />
            </MyButton>
            <EditUser />
          </CardActions>
        </Card>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            Impossible de trouver l'utilisateur, merci de vous connecter à
            nouveau
          </Typography>
          <div className={classes.buttons}>
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
