import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import Gif from "../components/gif/Gif";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";

// Redux
import { connect } from "react-redux";
import { getGifs } from "../redux/actions/gifActions";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column-reverse",
  },
};

export class home extends Component {
  componentDidMount() {
    this.props.getGifs();
  }

  render() {
    const { classes } = this.props;
    const { gifs } = this.props.gifs;
    const recentGifsMarkup = gifs.map((gif) => (
      <Gif gif={gif} key={gif.gifId} />
    ));

    return (
      <Container maxWidth="lg" className={classes.container} >
        {recentGifsMarkup}
      </Container>
    );
  }
}

home.propTypes = {
  getGifs: PropTypes.func.isRequired,
  gifs: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  gifs: state.gifs,
});

export default connect
  (mapStateToProps, { getGifs })(withStyles(styles)(home)
);
