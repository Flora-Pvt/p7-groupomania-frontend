import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Gif from "../components/Gif"

export class home extends Component {
  state = {
    gifs: null,
  };

  componentDidMount() {
    axios
      .get("http://localhost:3000/api/gifs/")
      .then((res) => {
        this.setState({ gifs: res.data });
      })
      .catch((err) => console.log(err));
  }

  render() {
    let recentGifsMarkup = this.state.gifs ? (
      this.state.gifs.map((gif) => <Gif gif={gif} />)
    ) : (
      <p>Loading...</p>
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={3} xs={12}>
          <p>Content...</p>
        </Grid>
        <Grid item sm={9} xs={12}>
          {recentGifsMarkup}
        </Grid>
      </Grid>
    );
  }
}

export default home;
