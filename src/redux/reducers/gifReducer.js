/* eslint-disable import/no-anonymous-default-export */
import { SET_GIFS, LOADING_GIFS, DELETE_GIF, LIKE_GIF, UNLIKE_GIF } from "../types";

const initialState = {
  gifs: [],
  gif: {},
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
    case DELETE_GIF:
      let index = state.gifs.findIndex((gif) => gif.gifId === action.payload);
      state.gifs.splice(index, 1);
      return {
        ...state,
      };
    case LIKE_GIF:
    case UNLIKE_GIF:
      index = state.gifs.findIndex(
        (gif) => gif.gifId === action.payload.gifId
      );
      state.gifs[index] = action.payload;
      if (state.gif.screamId === action.payload.gifId) {
        state.gif = action.payload;
      }
      return {
        ...state,
      };
    default:
      return state;
  }
}
