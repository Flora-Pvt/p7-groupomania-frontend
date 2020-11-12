import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const themeObject = createMuiTheme({
  palette: {
    secondary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    primary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
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
