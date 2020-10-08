import React, { useEffect, useState } from "react";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px",
    // maxWidth: "36ch",
    backgroundColor: "teal",
    boxShadow: "2px 3px #ccc",
  },
  inline: {
    display: "inline",
  },
}));

const EditedDoc = (props) => {
  const classes = useStyles();
  const [editedDocs, setEditedDocs] = useState(null);

  const apiFetch = async () => {
    if (props.user.role === "admin") {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthToken(token);
      }
      const response = await axios.get("/api/editedDocs/");
      console.log(response.data);
      setEditedDocs(response.data);
    }
  };

  useEffect(() => {
    apiFetch();
  }, []);
  return editedDocs !== null ? (
    <div>
      <h2
        style={{
          marginTop: "20px",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
      >
        Edited Docs
      </h2>
      <List className={classes.root}>
        {editedDocs.map((editedDoc, index) => (
          <div key={editedDoc._id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="Remy Sharp"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png"
                />
              </ListItemAvatar>
              <ListItemText
                style={{ color: "white" }}
                primary="Whats up?"
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                      style={{ color: "white" }}
                    >
                      {editedDoc.by + " - " + editedDoc.text}
                    </Typography>
                  </React.Fragment>
                }
              ></ListItemText>
              <ListItemSecondaryAction>
                <IconButton>
                  <CheckIcon style={{ color: "lime" }} />
                </IconButton>
                <IconButton>
                  <ClearIcon style={{ color: "salmon" }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </div>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(EditedDoc);
