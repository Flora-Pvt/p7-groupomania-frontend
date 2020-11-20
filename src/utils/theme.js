import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

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
      alignItems: "center"
    },
    logo: {
      maxHeight: 30,
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
    },
    header: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
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
    },
    commentButton: {
      justifyContent: "flex-end",
      paddingTop: 0,
      width: "95%",
    },
  },
});

export default themeObject;
