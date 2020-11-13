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
    .post("http://localhost:3000/api/auth/login", userData)
    .then((auth) => {
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
    .post("http://localhost:3000/api/auth/signup", newUserData)
    .then((auth) => {
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
  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth.userId;
  axios
    .get("http://localhost:3000/api/auth/" + userId)
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
  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth.userId;
  axios
    .put("http://localhost:3000/api/auth/" + userId, userEdit)
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

export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  const auth = JSON.parse(localStorage.getItem("auth"));
  const userId = auth.userId;
  axios
    .post("http://localhost:3000/api/auth/" + userId, formData)
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
  localStorage.removeItem("auth");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

const setAuthorizationHeader = (auth) => {
  const token = `Bearer ${auth.data.token}`;
  localStorage.setItem("auth", JSON.stringify(auth.data));
  axios.defaults.headers.common["Authorization"] = token;
};
