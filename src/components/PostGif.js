import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../utils/MyButton";

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

// Redux
import { connect } from "react-redux";
import { postGif } from "../redux/network/gifNetwork";

const styles = (theme) => ({
  ...theme.styling,
});

export class PostGif extends Component {
  state = {
    title: "",
    image: "",
    errors: {},
    open: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors,
      });
    }
    if(!nextProps.UI.errors && !nextProps.UI.loading){
      this.setState({title: "", image: ""})
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, errors: {} });
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
    const { errors } = this.state;
    const {
      classes,
      UI: { loading },
    } = this.props;

    return (
      <Fragment>
        <MyButton
          tip="Ajouter votre GIF !"
          onClick={this.handleOpen}
          className={classes.button}
        >
          <AddIcon color="primary" />
        </MyButton>
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
                placeholder="Titre du GIF"
                onChange={this.handleChange}
                error={errors.body ? true : false}
                helperText={errors.body}
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
              <MyButton
                tip="Ajouter l'image du GIF"
                onClick={this.handleAddImage}
                className="button"
              >
                <AddPhotoAlternateIcon color="primary" />
              </MyButton>
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

PostGif.propTypes = {
  postGif: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { postGif })(
  withStyles(styles)(PostGif)
);
