/* eslint-disable import/no-anonymous-default-export */
import {
  SET_GIFS,
  SET_GIF,
  LOADING_GIFS,
  LOADING_GIF,
  POST_GIF,
  DELETE_GIF,
  SET_COMMENTS,
  LOADING_COMMENTS,
  POST_COMMENT,
  LIKE_GIF,
  UNLIKE_GIF,
} from "../types";

const initialState = {
  gifs: [],
  gif: {},
  comments: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_GIFS:
      return {
        ...state,
        loading: true,
      };
    case SET_GIFS:
      return {
        ...state,
        gifs: action.payload,
        loading: false,
      };
    case LOADING_GIF:
      return {
        ...state,
        loading: true,
      };
    case SET_GIF:
      return {
        ...state,
        gif: action.payload,
        loading: false,
      };
    case POST_GIF:
      return {
        ...state,
        gifs: state.gifs.concat(action.payload),
      };
    case DELETE_GIF:
      let index = state.gifs.findIndex((gif) => gif.gifId === action.payload);
      state.gifs.splice(index, 1);
      return {
        ...state,
        gifs: state.gifs,
      };

    case LIKE_GIF:
      let gifToLikeIndex = state.gifs.findIndex(
        (gif) => gif.gifId === action.payload.gifId
      );
      let gifToLike = state.gifs[gifToLikeIndex];
      gifToLike.Likes.push(action.payload);
      return {
        ...state,
        gifs: state.gifs,
      };
    case UNLIKE_GIF:
      let gifToUnlikeIndex = state.gifs.findIndex(
        (gif) => gif.gifId === action.payload.gifId
      );
      let gifToUnlike = state.gifs[gifToUnlikeIndex];
      let liketoRemoveIndex = gifToUnlike.Likes.findIndex(
        (like) => like.userId === action.payload.userId
      );
      gifToUnlike.Likes.splice(liketoRemoveIndex, 1);
      return {
        ...state,
        gifs: state.gifs,
      };

    case LOADING_COMMENTS:
      return {
        ...state,
        loading: true,
      };
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case POST_COMMENT:
      return {
        ...state,
        comments: state.comments.concat(action.payload),
      };

    default:
      return state;
  }
}
