import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deleteGif } from "../../redux/actions/gifActions";

const styles = (theme) => ({
  ...theme.styling,
});

export class DeleteButton extends Component {
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
    this.props.deleteGif(this.props.gifId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <IconButton
          title="Supprimer le GIF"
          onClick={this.handleOpen}
          className={classes.upButton}
        >
          <DeleteOutline />
        </IconButton>
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
            <Button onClick={this.handleClose} color="secondary">
              Annuler
            </Button>
            <Button onClick={this.deleteGif} color="secondary">
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteButton.propTypes = {
  deleteGif: PropTypes.func.isRequired,
  gifId: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(null, { deleteGif })(withStyles(styles)(DeleteButton))
