import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../utils/MyButton";

// Material UI
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deleteGif } from "../../redux/network/gifNetwork";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%",
  },
};

export class DeleteGif extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteGif = () => {
    console.log(this.props)
    this.props.deleteGif(this.props.gifId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Supprimer le GIF"
          onClick={this.handleOpen}
          className={classes.deleteButton}
        >
          <DeleteOutline />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Vous êtes sûr de vouloir supprimer votre GIF ?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.deleteGif} color="primary">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteGif.propTypes = {
  deleteGif: PropTypes.func.isRequired,
  gifId: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(null, { deleteGif })(withStyles(styles)(DeleteGif));
