import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const breakpoints = createBreakpoints({});

const themeObject = createMuiTheme({
  palette: {
    secondary: {
      main: "#ef5350",
      contrastText: "#fff",
    },
    primary: {
      main: "#002984",
      contrastText: "#fff",
    },
  },

  styling: {
    // Navbar
    flexNavbar: {
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      maxHeight: 30,
      [breakpoints.down("sm")]: {
        maxHeight: 20,
      },
    },
    row: {
      display: "flex",
    },

    // user forms (login, signup, edit)
    form: {
      display: "flex",
      flexDirection: "column",
      width: 500,
      margin: "auto",
      marginBottom: 20,
      [breakpoints.down("sm")]: {
        width: "100%",
        margin: "auto",
      },
    },
    title: {
      alignSelf: "center",
    },
    flexEditAvatar: {
      display: "flex",
      marginBottom: 20,
    },
    addAvatarButton: {
      marginLeft: -19,
    },
    avatar: {
      width: 40,
      height: 40,
      overflow: "hidden",
      borderRadius: "50%",
      objectFit: "cover",
    },
    field: {
      marginBottom: 20,
    },
    link: {
      textDecoration: "underline",
    },

    // GIF cards
    container: {
      display: "flex",
      flexDirection: "column-reverse",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      width: "60%",
      margin: "auto",
      marginBottom: 20,
      [breakpoints.down("sm")]: {
        width: "100%",
      },
    },
    header: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
    },
    upButton: {
      padding: "0 1px 0 8px",
      [breakpoints.down("sm")]: {
        padding: 0,
        alignSelf: "flex-start",
      },
    },
    mediaAlign: {
      alignSelf: "center",
    },
    media: {
      width: "100%",
    },
    button: {
      padding: "0 1px 0 8px",
    },
    star: {
      marginTop: -4,
    },
    comments: {
      width: "95%",
      alignSelf: "center",
    },

    // forms for GIFS (post, edit)
    postButton: {
      color: "white",
      [breakpoints.down("sm")]: {
        fontSize: 10,
      },
    },
    addImgBlock: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      minHeight: 400,
      border: "solid black 1px",
      borderRadius: 0,
      marginTop: 30,
      [breakpoints.down("sm")]: {
        minHeight: 200,
      },
    },
    miniature: {
      width: "80%",
      height: "80%",
      objectFit: "cover",
      border: "solid transparent 1px",
    },
    addImgButton: {
      alignSelf: "flex-end",
    },

    // form for comments (post)
    commentField: {
      paddingBottom: 0,
      width: "90%",
      alignSelf: "center",
      '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 2,
      },
    },
    commentButton: {
      justifyContent: "flex-end",
      paddingTop: 0,
      width: "95%",
    },
  },
});

export default themeObject;
