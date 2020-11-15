import { SET_GIFS, LOADING_GIFS, LIKE_GIF } from "../types";

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
    case LIKE_GIF:
      let index = state.gifs.findIndex(
        (gif) => gif.gifId === action.payload.gifId
      );
      state.gifs[index] = action.payload;
      return {
        ...state,
      };
    default:
      return state;
  }
}
