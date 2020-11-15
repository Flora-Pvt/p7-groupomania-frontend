import { SET_GIFS, LOADING_GIFS, LIKE_GIF } from "../types";
import axios from "axios";

// Get all GIFS
export const getGifs = () => (dispatch) => {
  dispatch({ type: LOADING_GIFS });
  axios
    .get("http://localhost:3000/api/gifs")
    .then((res) => {
      console.log(res.data)
      dispatch({
        type: SET_GIFS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: SET_GIFS,
        payload: [],
      })
    );
};

// Like GIF
export const likeGif = (gifId) => (dispatch) => {
  axios
    .post("http://localhost:3000/api/likes/" + gifId)
    .then((res) => {
      dispatch({
        type: LIKE_GIF,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
