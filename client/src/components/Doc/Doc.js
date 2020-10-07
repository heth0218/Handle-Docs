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
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px",
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
    const { data } = response;
    setSelectedDoc(data);
    let dup = [];
    for (let i = 0; i < data.doc.length; i++) {
      dup.push(false);
    }
    setOpen(dup);
  };

  const openHandler = (index) => {
    let dup = [...open];
    dup[index] = true;
    setOpen(dup);
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
    if (props.user.role === "admin") {
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
        author: props.user._id,
      };
      console.log(data);
      const response = await axios.post("/api/editedDocs/", data);
      console.log(response);
      closeHandler(index);
    }
  };

  return selectedDoc !== null && open !== null ? (
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
        {props.user === "admin" ? "Customer Edited Docs" : "Your Edited Docs"}
      </Button>
      <h2 style={{ margin: "auto", textAlign: "center" }}>
        {selectedDoc.title}
      </h2>
      {selectedDoc.doc.map((doc, index) => {
        return open[index] ? (
          <div key={doc._id}>
            <TextField
              label="Doc Update"
              className={classes.root}
              style={{ display: "block" }}
              onChange={(event) => typingHandler(event)}
            />
            <IconButton onClick={() => editHandler(index)}>
              <CheckIcon style={{ color: "green" }} />
            </IconButton>
            <IconButton onClick={() => closeHandler(index)}>
              <ClearIcon style={{ color: "red" }} />
            </IconButton>
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
              <Typography>{doc.text}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                style={{ color: "lightgreen" }}
                onClick={() => openHandler(index)}
              >
                Edit
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Doc);
