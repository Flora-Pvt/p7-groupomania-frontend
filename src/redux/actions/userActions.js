import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
} from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/auth/login", userData)
    .then((auth) => {
      localStorage.setItem("userId", JSON.stringify(auth.data.userId));
      setAuthorizationHeader(auth);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.data,
      });
    });
};

export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/auth/signup", newUserData)
    .then((auth) => {
      localStorage.setItem("userId", JSON.stringify(auth.data.userId));
      setAuthorizationHeader(auth);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.data,
      });
    });
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  const userId = JSON.parse(localStorage.getItem("userId"));
  axios
    .get("/auth/" + userId)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const updateUser = (userEdit) => (dispatch) => {
  dispatch({ type: LOADING_USER });

  const userId = JSON.parse(localStorage.getItem("userId"));

  axios
    .put("/auth/" + userId, userEdit)
    .then(() => {
      dispatch(getUserData());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.data,
      });
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userId");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

const setAuthorizationHeader = (auth) => {
  const token = `Bearer ${auth.data.token}`;
  localStorage.setItem("token", JSON.stringify(auth.data.token));
  axios.defaults.headers.common["Authorization"] = token;
};
