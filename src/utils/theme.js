import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const themeObject = createMuiTheme({
  palette: {
    secondary: {
      main: '#ef5350',
      contrastText: '#fff',
    },
    primary: {
      main: '#002984',
      contrastText: '#fff',
    },
  },
  styling: {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
    marginLeft: -50,
  },
  media: {
    width: 50,
  },
  root: {
    width: "40ch",
  },
  field: {
    width: "40ch",
    marginBottom: 20,
  },
  link: {
    textDecoration: "underline",
  },
  customErrors: {
    fontSize: "0.8rem",
    marginTop: 10,
  },
  button: {
    position: "relative",
  },
  progress: {
    position: "absolute",
  },
}
});

export default themeObject;
