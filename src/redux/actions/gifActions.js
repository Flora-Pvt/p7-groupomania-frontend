import {
  SET_GIFS,
  SET_GIF,
  LOADING_GIFS,
  LOADING_GIF,
  POST_GIF,
  DELETE_GIF,
  LIKE_GIF,
  UNLIKE_GIF,
  SET_COMMENTS,
  LOADING_COMMENTS,
  POST_COMMENT,
  LOADING_UI,
} from "../types";
import axios from "axios";

// Get all GIFS
export const getGifs = () => (dispatch) => {
  dispatch({ type: LOADING_GIFS });
  axios
    .get("/gifs")
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

// Get one GIF
export const getOneGif = (gifId) => (dispatch) => {
  dispatch({ type: LOADING_GIF });
  axios
    .get("/gifs/" + gifId)
    .then((res) => {
      dispatch({
        type: SET_GIF,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Post a GIF
export const postGif = (newGif) => (dispatch) => {
  axios
    .post("/gifs", newGif)
    .then((res) => {
      axios.get("/gifs/" + res.data.gifId).then((gif) => {
        dispatch({
          type: POST_GIF,
          payload: gif.data,
        });
      });
    })
    .catch((err) => console.log(err));
};

// Delete GIF
export const deleteGif = (gifId) => (dispatch) => {
  axios
    .delete("/gifs/" + gifId)
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
    .post("/likes/" + gifId, like)
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
    .delete("/likes/" + gifId, {
      data: {
        userId: userId,
      },
    })
    .then((res) => {
      dispatch({
        type: UNLIKE_GIF,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

// Get all comments
export const getComments = (gifId) => (dispatch) => {
  dispatch({ type: LOADING_COMMENTS });
  axios
    .get("/comments/" + gifId)
    .then((res) => {
      dispatch({
        type: SET_COMMENTS,
        payload: res.data,
      });
    })
    .catch(() =>
      dispatch({
        type: SET_COMMENTS,
        payload: [],
      })
    );
};

// Post a comment
export const postComment = (gifId, newComment) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log(gifId, newComment);
  axios
    .post("/comments/" + gifId, newComment)
    .then((res) => {
      dispatch({
        type: POST_COMMENT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};