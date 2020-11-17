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
  SET_ERRORS,
  CLEAR_ERRORS,
} from "../types";
import axios from "axios";

// Get all GIFS
export const getGifs = () => (dispatch) => {
  dispatch({ type: LOADING_GIFS });
  axios
    .get("http://localhost:4000/api/gifs")
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
    .get("http://localhost:4000/api/gifs/" + gifId)
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
  dispatch({ type: LOADING_UI });
  axios
    .post("http://localhost:4000/api/gifs", newGif)
    .then((res) => {
      dispatch({
        type: POST_GIF,
        payload: res.data,
      });
      dispatch(dispatch(clearErrors()))
    })
    .catch((err) =>
      dispatch({
        type: SET_ERRORS,
        payload: err.data,
      })
    );
};

// Delete GIF
export const deleteGif = (gifId) => (dispatch) => {
  axios
    .delete("http://localhost:4000/api/gifs/" + gifId)
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
    .post("http://localhost:4000/api/likes/" + gifId, like)
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
    .delete("http://localhost:4000/api/likes/" + gifId, {
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
    .get("http://localhost:4000/api/comments/" + gifId)
    .then((res) => {
      dispatch({
        type: SET_COMMENTS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: SET_COMMENTS,
        payload: [],
      })
    );
};

// Post a comment
export const postComment = (gifId, newComment) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log(gifId, newComment)
  axios
    .post("http://localhost:4000/api/comments/" + gifId, newComment)
    .then((res) => {
      dispatch({
        type: POST_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) =>
      dispatch({
        type: SET_ERRORS,
        payload: err.data,
      })
    );
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
