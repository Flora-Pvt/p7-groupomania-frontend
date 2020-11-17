import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";

import Gif from "../components/gif/Gif";

import { connect } from "react-redux";
import { getGifs } from "../redux/network/gifNetwork";

export class home extends Component {
  componentDidMount() {
    this.props.getGifs();
  }

  render() {
    const { gifs } = this.props.gifs;
    const recentGifsMarkup = gifs.map((gif) => (
      <Gif gif={gif} key={gif.gifId} />
    ));

    return <Container maxWidth="lg">{recentGifsMarkup}</Container>;
  }
}

home.propTypes = {
  getGifs: PropTypes.func.isRequired,
  gifs: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  gifs: state.gifs,
});

export default connect(mapStateToProps, { getGifs })(home);
