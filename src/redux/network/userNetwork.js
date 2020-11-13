import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";
import axios from "axios";

export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("http://localhost:3000/api/auth/login", userData)
    .then((res) => {
      const token = `Bearer ${res.data.token}`;
      localStorage.setItem("auth", JSON.stringify(res.data));
      axios.defaults.headers.common["Authorization"] = token;
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserData = () => (dispatch) => {
  const auth = JSON.parse(localStorage.getItem('auth'))
  const userId = auth.userId
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
