import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import Gif from "../components/gif/Gif";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";

// Redux
import { connect } from "react-redux";
import { getGifs } from "../redux/actions/gifActions";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column-reverse",
    width: 700,
  },
  root: {
    marginBottom: 20,
  }
};

export class home extends Component {
  componentDidMount() {
    this.props.getGifs();
  }

  render() {
    const { classes } = this.props;
    const { gifs } = this.props.gifs;
    const recentGifsMarkup = gifs.map((gif) => (
      <Card className={classes.root}>
      <Gif gif={gif} key={gif.gifId} />
      </Card>
    ));

    return (
      <Container className={classes.container} >
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
