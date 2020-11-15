import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";

import Gif from "../components/Gif";
import User from "../components/User";

import { connect } from "react-redux";
import { getGifs } from "../redux/network/gifNetwork";

export class home extends Component {
  
  componentDidMount() {
    this.props.getGifs();
  }

  render() {
    console.log(this.props);
    const { gifs, loading } = this.props.gifs;
    let recentGifsMarkup = !loading ? (
      gifs.map((gif) => <Gif gif={gif} key={gif.gifId} />)
    ) : (
      <p>Loading...</p>
    );

    return (
      <Grid container>
        <Grid item sm={3} xs={12}>
          <User />
        </Grid>
        <Grid item sm={8} xs={12}>
          {recentGifsMarkup}
        </Grid>
      </Grid>
    );
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
