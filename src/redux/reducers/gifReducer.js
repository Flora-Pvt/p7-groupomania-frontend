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
        comments: state.comments.concat(action.payload),
      };
    case LIKE_GIF:
    case UNLIKE_GIF:
      let index = state.gifs.findIndex(
        (gif) => gif.gifId === action.payload.gifId
      );
      state.gifs[index] = action.payload;
      if (state.gif.gifId === action.payload.gifId) {
        state.gif = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_GIF:
      index = state.gifs.findIndex((gif) => gif.gifId === action.payload);
      state.gifs.splice(index, 1)    
      return {
        ...state,
      };
    default:
      return state;
  }
}
