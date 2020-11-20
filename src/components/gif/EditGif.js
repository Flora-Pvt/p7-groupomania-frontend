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
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

// Redux
import { connect } from "react-redux";
import { updateGif } from "../../redux/actions/gifActions";

const styles = (theme) => ({
  ...theme.styling,
  flexEditImage: {
    display: "flex",
    marginBottom: 20,
  },
  addImage: {
    marginLeft: -19,
  },
  addImageBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: 400,
    border: "solid black 1px",
    borderRadius: 0,
    marginTop: 30,
  },
  miniature: {
    width: "80%",
    height: "80%",
    objectFit: "cover",
    border: "solid transparent 1px",
  },
});

export class EditGif extends Component {
  state = {
    title: "",
    image: "",
    fileInput: React.createRef(),
    fileOutput: React.createRef(),
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
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
    fileOutput.src = URL.createObjectURL(event.target.files[0])
    this.setState({
      image: event.target.files[0],
    });
  };

  handleSubmit = () => {
    const userId = localStorage.getItem("userId");
    const title = JSON.stringify(this.state.title);
    const image = this.state.image;

    const gifDetails = new FormData();
    gifDetails.append("image", image);
    gifDetails.append("userId", userId);
    gifDetails.append("title", title);
    this.props.updateGif(this.props.gifId, gifDetails);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <IconButton
          title="Editer votre GIF"
          onClick={this.handleOpen}
          className={classes.button}
        >
          <EditIcon />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Ajouter votre GIF !</DialogTitle>
          <DialogContent>
            <form encType="multipart/form-data">
              <TextField
                name="title"
                type="text"
                label="Titre du GIF"
                value={this.state.title}
                onChange={this.handleChange}
                className={classes.TextField}
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
                className={classes.addImageBlock}
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
                  className={classes.addImageBtn}
                />
              </IconButton>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Annuler
            </Button>
            <Button onClick={this.handleSubmit} color="secondary">
              Sauvegarder
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditGif.propTypes = {
  updateGif: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  gifId: PropTypes.number.isRequired,
};

const mapActionsToProps = { updateGif };

export default connect(
  null,
  mapActionsToProps
)(withStyles(styles)(EditGif));
