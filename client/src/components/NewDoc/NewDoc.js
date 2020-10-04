import React, { useState } from "react";
import { connect } from "react-redux";

import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { addNewDoc } from "../../actions/newDocs";

const NewDoc = (props) => {
  const [number, setNumber] = useState([Math.random()]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState([{ text: "" }]);

  const addButtonHandler = (event) => {
    event.preventDefault();
    console.log(content);
    const dup = [...number];
    const contentdup = [...content];
    dup.push(Math.random());
    contentdup.push({ text: "" });
    setNumber(dup);
    setContent(contentdup);
  };

  const titleChangedHandler = (event) => {
    setTitle(event.target.value);
  };

  const imageUrlChangedHandler = (event) => {
    setImageUrl(event.target.value);
  };

  const contentChangedHandler = (event, i) => {
    const dup = [...content];
    dup[i].text = event.target.value;
    setContent(dup);
  };

  const submitFormHandler = async () => {
    await props.onAddNewDoc(title, content, imageUrl);
    props.history.replace("/");
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Create a New Documentation</h2>
      <div style={{ width: "80%", margin: "auto" }}>
        <TextField
          label="title"
          fullWidth
          onChange={(event) => titleChangedHandler(event)}
        />
        <TextField
          label="imageUrl"
          fullWidth
          onChange={(event) => imageUrlChangedHandler(event)}
        />
        {number.map((el, i) => {
          return (
            <TextField
              key={el + `${i}`}
              label="Content"
              multiline
              rows={3}
              fullWidth
              defaultValue=""
              onChange={(event) => contentChangedHandler(event, i)}
            />
          );
        })}
        <Fab
          color="primary"
          aria-label="add"
          style={{ float: "right" }}
          onClick={(event) => addButtonHandler(event)}
        >
          <AddIcon />
        </Fab>
        <Button
          variant="contained"
          color="primary"
          endIcon={<Icon>send</Icon>}
          style={{
            marginTop: "100px",
            left: "50%",
            width: "10%",
          }}
          onClick={submitFormHandler}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddNewDoc: (title, content, imageUrl) =>
      dispatch(addNewDoc(title, content, imageUrl)),
  };
};

export default connect(null, mapDispatchToProps)(NewDoc);
