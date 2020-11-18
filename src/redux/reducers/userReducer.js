/* eslint-disable import/no-anonymous-default-export */
import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_GIF,
  UNLIKE_GIF
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  gifs: [],
  comments: [],
  likes: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_GIF:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userId: state.credentials.userId,
            gifId: action.payload.gifId,
          },
        ],
      };
      case UNLIKE_GIF:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.gifId !== action.payload.gifId
        )
      };
    default:
      return state;
  }
}
