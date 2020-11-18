import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

// Material UI
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

// Redux
import { connect } from "react-redux";
import { postGif } from "../../redux/network/gifNetwork";

const styles = (theme) => ({
  ...theme.styling,
  button: {
    color: "white"
  }, 
  addImage: {
    width: "100%",
    minHeight: 250,
    border: "solid black 1px",
    borderRadius: 0,
    marginTop: 30
  }
});

export class GifForm extends Component {
  state = {
    title: "",
    image: "",
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({open: false})
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleImageLoaded = (event) => {
    this.setState({
      image: event.target.files[0],
    });
  };

  handleAddImage = () => {
    const fileInput = document.getElementById("image");
    fileInput.click();
  };

  handleSubmit = () => {
    const userId = localStorage.getItem("userId");
    const title = JSON.stringify(this.state.title);
    const image = this.state.image;
    
    const newGif = new FormData();
    newGif.append("image", image);
    newGif.append("userId", userId);
    newGif.append("title", title);
    this.props.postGif(newGif);
    this.handleClose();
  };

  render() {
    const {
      classes,
      UI: { loading },
    } = this.props;

    return (
      <Fragment>
        <Button 
          onClick={this.handleOpen}
          className={classes.button}
        >
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
                id="image"
                name="image"
                type="file"
                label="Image"
                hidden="hidden"
                accept="image/*"
                files={this.state.image}
                onChange={this.handleImageLoaded}
              />
              <IconButton
                tip="Ajouter l'image du GIF"
                onClick={this.handleAddImage}
                className={classes.addImage}
              >
                <AddPhotoAlternateIcon color="primary" />
              </IconButton>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Annuler
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Enregistrer
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

GifForm.propTypes = {
  postGif: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postGif })(
  withStyles(styles)(GifForm)
);
