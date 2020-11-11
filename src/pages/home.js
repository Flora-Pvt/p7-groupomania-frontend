import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

export class home extends Component {
  state = {
    gifs: null,
  };

  componentDidMount() {
    const request = new Request("http://localhost:3000/api/gifs/", {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer ",
      }),
    });

    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ gifs: data });
      })
      .catch((error) => console.log(error));

    /* axios
      .get(request)
      .then((res) => {
        this.setState({
          gifs: data,
        });
      })
      .catch((err) => console.log(err)); */
  }

  render() {
    let recentGifsMarkup = this.state.gifs ? (
      this.state.gifs.map((gif) => <p key={gif.gifId}>{gif.title}</p>)
    ) : (
      <p>Loading...</p>
    );

    return (
      <Grid container spacing={10}>
        <Grid item sm={4} xs={12}>
          <p>Content...</p>
        </Grid>
        <Grid item sm={8} xs={12}>
          {recentGifsMarkup}
        </Grid>
      </Grid>
    );
  }
}

export default home;
