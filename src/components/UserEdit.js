import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { updateUser } from "../redux/network/userNetwork";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const styles = (theme) => ({
  ...theme.styling,
  button: {
    float: "right"
  }
});

export class userEdit extends Component {
  state = {
    officePosition: "",
    open: false,
  };

  mapUserDetailsToState = (credentials) => {
    this.setState({
      officePosition: credentials.officePosition
        ? credentials.officePosition
        : "",
    });
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => {
    const userDetails = {
      officePosition: this.state.officePosition,
    };
    this.props.updateUser(userDetails);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <IconButton onClick={this.handleOpen} className={classes.button}>
          <EditIcon color="primary" />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Modifier vos informations</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="officePosition"
                type="text"
                label="Rôle dans l'entreprise"
                className={classes.TextField}
                value={this.state.officePosition}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Sauvegarder
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

userEdit.propTypes = {
  updateUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { updateUser })(
  withStyles(styles)(userEdit)
);
