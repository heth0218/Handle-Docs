import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import setAuthToken from "../../utils/setAuthToken";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FilledInput from "@material-ui/core/FilledInput";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Player } from "video-react";
import Navbar from "../layout/Navbar";
import EditIcon from "@material-ui/icons/Edit";
import FormControl from "@material-ui/core/FormControl";
import {
  Button as CommentButton,
  Comment,
  Form,
  Header,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px",
  },
  margin: {
    margin: theme.spacing(1),
  },
  title: {
    fontSize: 14,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Doc = (props) => {
  const [editedText, setEditedText] = useState("");
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [open, setOpen] = useState(null);
  const [writeComment, setWriteComment] = useState("");
  const [comments, setComments] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    apiFetch();
  }, []);

  const apiFetch = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    }
    const response = await axios.get("/api/newdocs/" + props.match.params.id);
    const response1 = await axios.get("/api/comments/" + props.match.params.id);
    setComments(response1.data);
    const { data } = response;
    setSelectedDoc(data);
    let dup = [];
    for (let i = 0; i < data.doc.length; i++) {
      dup.push(false);
    }
    setOpen(dup);
  };

  const openHandler = (index, docText) => {
    let dup = [...open];
    dup[index] = true;
    setOpen(dup);
    setEditedText(docText);
  };

  const closeHandler = (index) => {
    let dup = [...open];
    dup[index] = false;
    setOpen(dup);
  };

  const typingHandler = (event) => {
    setEditedText(event.target.value);
  };

  const editHandler = async (index) => {
    if (props.user.role === "admin" && props.user._id === selectedDoc.admin) {
      let dupObject = { ...selectedDoc };
      let dupArray = [...dupObject.doc];
      dupArray[index].text = editedText;
      const id = selectedDoc.doc[index]._id;
      const token = localStorage.getItem("token");
      if (token) {
        setAuthToken(token);
      }
      const data = {
        data: {
          _id: id,
          text: editedText,
        },
      };
      const response = await axios.post(
        "/api/newdocs/update/" + selectedDoc._id,
        data
      );
      alert("Document Section updated!");
      console.log(response);
      setSelectedDoc(dupObject);
      closeHandler(index);
    } else {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthToken(token);
      }
      const data = {
        _id: selectedDoc.doc[index]._id,
        model: selectedDoc._id,
        text: editedText,
        author: selectedDoc.author,
      };
      await axios.post("/api/editedDocs/", data);
      alert("Request for update sent!");
      closeHandler(index);
    }
  };

  const onCommentHandler = async () => {
    const data = {
      on: props.match.params.id,
      text: writeComment,
    };
    const response = await axios.post("/api/comments/", data);
    console.log(response);
    let dup = [...comments];
    let responseData = { ...response.data };
    responseData.by = {
      _id: response.data.by,
      name: props.user.name,
      imageUrl: props.user.imageUrl,
    };
    dup.unshift(responseData);
    setComments(dup);
  };

  return selectedDoc !== null && open !== null ? (
    <React.Fragment>
      <Navbar />
      <div style={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<NavigateNextIcon />}
          style={{
            left: "50%",
            marginTop: "20px",
            width: "20%",
            transform: "translate(-50%, -50%)",
          }}
          onClick={() => props.history.push("/editedDoc")}
        >
          Goto{" "}
          {props.user.role === "admin"
            ? "User Edited Docs"
            : "Your Edited Docs"}
        </Button>
        <h2
          style={{
            margin: "auto",
            textAlign: "center",
            fontFamily: "monospace",
          }}
        >
          {selectedDoc.title}.
        </h2>
        {selectedDoc.doc.map((doc, index) => {
          return open[index] ? (
            <div
              key={doc._id}
              style={{
                marginLeft: "6%",
                marginRight: "6%",
              }}
            >
              <FormControl
                fullWidth
                className={classes.margin}
                variant="filled"
              >
                <FilledInput
                  id="filled-adornment-amount"
                  value={editedText}
                  onChange={(event) => typingHandler(event)}
                />
                <React.Fragment>
                  <IconButton onClick={() => editHandler(index)}>
                    <CheckIcon style={{ color: "green" }} />
                  </IconButton>
                  <IconButton onClick={() => closeHandler(index)}>
                    <ClearIcon style={{ color: "red" }} />
                  </IconButton>
                </React.Fragment>
              </FormControl>
            </div>
          ) : (
            <Card
              key={doc._id}
              className={classes.root}
              style={{
                backgroundColor: "teal",
                color: "white",
                fontSize: "25px",
              }}
            >
              <CardContent>
                <Typography style={{ fontSize: "20px" }}>{doc.text}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  style={{ color: "lightgreen" }}
                  onClick={() => openHandler(index, doc.text)}
                >
                  Edit this info.
                  <IconButton aria-label="share">
                    <EditIcon />
                  </IconButton>
                </Button>
              </CardActions>
            </Card>
          );
        })}
        <br />
        <br />
        {selectedDoc.url && (
          <div>
            <div className="center">
              <h1 className="teal-text">Our Tutorial for the same!</h1>
            </div>
            <br />
            <br />
            <div className="container" style={{ width: "700px" }}>
              <Player>
                <source src={selectedDoc.url} />
              </Player>
            </div>
          </div>
        )}

        <div style={{ marginLeft: "15%", marginTop: "30px" }}>
          <Comment.Group>
            <Header as="h2" dividing>
              Comments
            </Header>
            {comments.map((comment) => {
              return (
                <Comment key={comment._id}>
                  <Comment.Avatar src={comment.by.imageUrl} />
                  <Comment.Content>
                    <Comment.Author as="a">{comment.by.name}</Comment.Author>
                    <Comment.Metadata>
                      <div>{comment.date}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.text}</Comment.Text>
                  </Comment.Content>
                </Comment>
              );
            })}
            <Form reply>
              <Form.TextArea
                onChange={(event) => setWriteComment(event.target.value)}
              />
              <CommentButton
                content="Add Reply"
                labelPosition="left"
                icon="edit"
                primary
                onClick={() => onCommentHandler()}
              />
            </Form>
          </Comment.Group>
        </div>
      </div>
    </React.Fragment>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Doc);
