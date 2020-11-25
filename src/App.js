import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

// Redux
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { getUserData, logoutUser } from "./redux/actions/userActions";

// Components
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./utils/AuthRoute";
import themeObject from "./utils/theme";

// Pages
import home from "./pages/home";
import gif from "./pages/gif";
import user from "./pages/user";
import login from "./pages/login";
import signup from "./pages/signup";

import axios from "axios";

const theme = themeObject;

axios.defaults.baseURL = "http://localhost:4000/api";

const token = JSON.parse(localStorage.getItem("token"));

if (token) {
  const decodedToken = jwt_decode(token);
  if (decodedToken.exp === 0) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <MuiThemeProvider theme={theme}>
              <Navbar />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={home} />
                </Switch>
                <Switch>
                  <Route exact path="/gif/:id" component={gif} />
                </Switch>
                <Switch>
                  <Route exact path="/user" component={user} />
                </Switch>
                <Switch>
                  <AuthRoute exact path="/login" component={login} />
                </Switch>
                <Switch>
                  <AuthRoute exact path="/signup" component={signup} />
                </Switch>
              </div>
            </MuiThemeProvider>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
