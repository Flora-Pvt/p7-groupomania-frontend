import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

// Components
import Navbar from "./components/Navbar";
import AuthRoute from "./utils/AuthRoute";
import themeObject from "./utils/theme";

// Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

const theme = themeObject;

let authenticated;
const token = localStorage.auth;
if (token) {
  authenticated = true;
} else {
  authenticated = false;
  if (window.location.href !== "http://localhost:3001/login") {
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
              </Switch>
              <Switch>
                <AuthRoute
                  exact
                  path="/login"
                  component={login}
                  authenticated={authenticated}
                />
              </Switch>
              <Switch>
                <AuthRoute
                  exact
                  path="/signup"
                  component={signup}
                  authenticated={authenticated}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
