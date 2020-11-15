import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "./redux/types";
import { getUserData } from "./redux/network/userNetwork";

// Components
import Navbar from "./components/Navbar";
import AuthRoute from "./utils/AuthRoute";
import themeObject from "./utils/theme";

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import axios from "axios";

const theme = themeObject;

if (JSON.parse(localStorage.getItem("token"))) {
  const token = JSON.parse(localStorage.getItem("token"));
  store.dispatch({ type: SET_AUTHENTICATED });
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  store.dispatch(getUserData());
} else {
  store.dispatch({ type: SET_UNAUTHENTICATED });
  if (window.location.href !== "http://localhost:3001/login") {
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
              </Switch>
              <Switch>
                <AuthRoute exact path="/login" component={login} />
              </Switch>
              <Switch>
                <AuthRoute exact path="/signup" component={signup} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
