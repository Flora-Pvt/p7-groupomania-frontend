import { SET_GIFS, LOADING_GIFS, LIKE_GIF, UNLIKE_GIF } from "../types";
import axios from "axios";

// Get all GIFS
export const getGifs = () => (dispatch) => {
  dispatch({ type: LOADING_GIFS });
  axios
    .get("http://localhost:3000/api/gifs")
    .then((res) => {
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
  const auth = JSON.parse(localStorage.getItem("auth"));

  const like = {
    gifId: gifId,
    userId: auth.userId,
  };

  axios
    .post("http://localhost:3000/api/likes/" + gifId, like)
    .then((res) => {
      dispatch({
        type: LIKE_GIF,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Unlike GIF
export const unlikeGif = (gifId) => (dispatch) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  axios
    .delete("http://localhost:3000/api/likes/" + gifId, {data: {
      userId: auth.userId}})
    .then((res) => {
      dispatch({
        type: UNLIKE_GIF,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
