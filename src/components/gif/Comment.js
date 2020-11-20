import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

// Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

// Redux
import { connect } from "react-redux";

const styles = (theme) => ({
  ...theme.styling,
});

export class Comment extends Component {
  render() {
    const { classes, comments } = this.props;

    const { loading } = this.props.comments;

    const commentsMarkup = !loading ? (
      comments ? (
        <Fragment>
          {" "}
          {comments.map((comment) => {
            const { commentId, content, createdAt, User } = comment;
            return (
              <Fragment key={commentId}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar src={User.avatar} alt="Avatar" />
                  </ListItemAvatar>
                  <ListItemText
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"                          
                        >
                          {User.firstName} {User.lastName}
                        </Typography>
                        {" - "} {dayjs(createdAt).fromNow()}
                      </React.Fragment>
                    }
                    primary={content}
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </Fragment>
            );
          })}
        </Fragment>
      ) : (
        <p>Impossible de charger les commentaires...</p>
      )
    ) : (
      <p>Chargement...</p>
    );

    return <List className={classes.comments}>{commentsMarkup}</List>;
  }
}

Comment.propTypes = {
  comments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  comments: state.gifs.comments,
});

export default connect(mapStateToProps)(withStyles(styles)(Comment));
