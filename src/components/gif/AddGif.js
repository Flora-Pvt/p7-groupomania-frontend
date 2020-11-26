import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import Button from "@material-ui/core/Button";

// Redux
import { connect } from "react-redux";
import { postGif } from "../../redux/actions/gifActions";

const styles = (theme) => ({
  ...theme.styling,
});

export class AddGif extends Component {
  state = {
    title: "",
    image: "",
    fileInput: React.createRef(),
    fileOutput: React.createRef(),
    errors: "",
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, errors: "" });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAddImage = () => {
    const fileInput = this.state.fileInput.current;
    fileInput.click();
  };

  handleImageLoaded = (event) => {
    const fileOutput = this.state.fileOutput.current;
    fileOutput.src = URL.createObjectURL(event.target.files[0]);
    this.setState({
      image: event.target.files[0],
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (!this.state.title || this.state.title === undefined || !this.state.image || this.state.image === undefined) {
      this.setState({ errors: "Vérifiez les données saisies" });
    } else {
      const userId = localStorage.getItem("userId");
      const title = JSON.stringify(this.state.title);
      const image = this.state.image;

      const newGif = new FormData();
      newGif.append("image", image);
      newGif.append("userId", userId);
      newGif.append("title", title);
      this.props.postGif(newGif);

      this.setState({
        title: "",
        image: "",
      });
      this.handleClose();
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Button onClick={this.handleOpen} className={classes.postButton}>
          <AddIcon />
          Nouveau GIF
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Ajouter votre GIF !</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit} encType="multipart/form-data" noValidate>
            <span style={{ color: "red" }}>{this.state.errors}</span>
              <TextField
                required
                name="title"
                type="text"
                label="Titre du GIF"
                value={this.state.title}
                onChange={this.handleChange}
                className={classes.field}
                fullWidth
              />              
              <input
                ref={this.state.fileInput}
                name="image"
                type="file"
                label="Image"
                hidden="hidden"
                accept="image/*, video/*"
                files={this.state.image}
                onChange={this.handleImageLoaded}
              />
              <IconButton
                title="Ajouter l'image du GIF"
                onClick={this.handleAddImage}
                className={classes.addImgBlock}
              >
                {this.state.fileOutput.src !== undefined ? (
                  <img
                    ref={this.state.fileOutput}
                    alt="GIF miniature"
                    className={classes.miniature}
                  />
                ) : (
                  <img
                    ref={this.state.fileOutput}
                    alt=""
                    className={classes.miniature}
                  />
                )}
                <AddPhotoAlternateIcon
                  color="secondary"
                  className={classes.addImgButton}
                />
              </IconButton>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Annuler
            </Button>
            <Button type="submit" onClick={this.handleSubmit} color="secondary">
              Sauvegarder
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

AddGif.propTypes = {
  postGif: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapActionsToProps = {
  postGif,
};

export default connect(null, mapActionsToProps)(withStyles(styles)(AddGif));
