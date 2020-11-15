import { SET_GIFS, LOADING_GIFS, DELETE_GIF, LIKE_GIF, UNLIKE_GIF } from "../types";
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

// Delete GIF
export const deleteGif = (gifId) => (dispatch) => {
  axios
    .delete("http://localhost:3000/api/gifs/" + gifId)
    .then((res) => {
      dispatch({
        type: DELETE_GIF,
        payload: gifId,
      });
    })
    .catch((err) => console.log(err));
};

// Like GIF
export const likeGif = (gifId) => (dispatch) => {
  const userId = JSON.parse(localStorage.getItem("userId"));

  const like = {
    gifId: gifId,
    userId: userId,
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
  const userId = JSON.parse(localStorage.getItem("userId"));

  axios
    .delete("http://localhost:3000/api/likes/" + gifId, {data: {
      userId: userId}})
    .then((res) => {
      dispatch({
        type: UNLIKE_GIF,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
