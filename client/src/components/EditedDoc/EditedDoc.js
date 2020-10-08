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

  const deleteHandler = async (id, index) => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    await axios.delete("/api/editedDocs/" + id);
    let dup = [...editedDocs];
    dup.splice(index, 1);
    setEditedDocs(dup);
  };

  const acceptEditHandler = async (docId, id, text) => {
    console.log(docId);
    console.log(id);
    console.log(text);
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    const data = {
      data: {
        _id: id,
        text: text,
      },
    };
    await axios.post("/api/newdocs/update/" + docId, data);
  };

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
                <Avatar alt="Remy Sharp" src={editedDoc.by.imageUrl} />
              </ListItemAvatar>
              <ListItemText
                style={{ color: "white" }}
                primary={editedDoc.by.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                      style={{ color: "white" }}
                    >
                      {editedDoc.by.name + " - " + editedDoc.text}
                    </Typography>
                  </React.Fragment>
                }
              ></ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  onClick={() =>
                    acceptEditHandler(
                      editedDoc.model,
                      editedDoc.mainId,
                      editedDoc.text
                    )
                  }
                >
                  <CheckIcon style={{ color: "lime" }} />
                </IconButton>
                <IconButton onClick={() => deleteHandler(editedDoc._id, index)}>
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
