import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { addNewDoc } from "../../actions/newDocs";
import firebase from "./firebase";
import { Player } from "video-react";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        <span cllas="brand-logo">Handlle Docs</span>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  submit2: {
    margin: theme.spacing(0, 0, 0),
  },
}));

const NewDoc = (props) => {
  const classes = useStyles();
  const [number, setNumber] = useState([Math.random()]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState([{ text: "" }]);
  const [files, setFiles] = useState();
  const [url, setUrl] = useState();
  const [tempurl, setTempUrl] = useState();
  const [patience, setPatience] = useState(false);

  useEffect(() => {
    if (url) {
      props.onAddNewDoc(title, content, imageUrl, url);
    }
  }, [url]);

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



  // const submit_link
  const submitFormHandler = (e) => {
    e.preventDefault()
    setUrl(tempurl)
    setPatience(false)
  }


  const handleChange = (file) => {
    setFiles(file);
  };

  const showImage = async () => {
    var file = files[0]
    var storageRef = firebase.storage().ref('images/' + file.name);

    var uploadTask = storageRef.put(file)

    uploadTask.on('state_changed', function (snapshot) {

    }, function (error) {
      console.log(error);
    }, async function () {

      // get the uploaded image url back 
      const url = await uploadTask.snapshot.ref.getDownloadURL()
      setTempUrl(url);
      console.log(url, 'lalalal')
    });
    setPatience(true)

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create documentation for <span class="brand-logo">{title}</span>
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="Title"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="Title"
              autoFocus
              onChange={(event) => titleChangedHandler(event)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="Image URL"
              label="Image URL"
              name="lastName"
              onChange={(event) => imageUrlChangedHandler(event)}
            />
          </Grid>

          <Grid item xs={12}>
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
          </Grid>
          <Grid item xs={10}></Grid>
          <Grid item xs={2}>
            <Fab
              color="primary"
              aria-label="add"
              style={{ float: "right" }}
              onClick={(event) => addButtonHandler(event)}
            >
              <AddIcon />
            </Fab>
          </Grid>
        </Grid>
        <React.Fragment>
          <div className="container">
            <div class="file-field input-field">
              <span>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submit2}
                >
                  Video
                </Button>
              </span>
              <span>
                <input
                  type="file"
                  onChange={(e) => {
                    handleChange(e.target.files);
                  }}
                />
              </span>


              <div class="file-path-wrapper">
                <input class="file-path validate" type="text" />
              </div>
            </div>
          </div>
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={showImage}
            className={classes.button}
            endIcon={<Icon>video</Icon>}
          >
            Show Video
          </Button>
          {!tempurl && patience && <h4>Please be patient while the video is being uploaded!</h4>}
          <div style={{ height: "auto", width: "300px", marginLeft: "500px" }}>
            {tempurl && (
              <Player>
                <source src={tempurl} />
              </Player>
            )}
          </div>
        </React.Fragment>
        {tempurl && <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={submitFormHandler}
        >
          Submit Document.
        </Button>}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddNewDoc: (title, content, imageUrl, url) =>
      dispatch(addNewDoc(title, content, imageUrl, url)),
  };
};
export default connect(null, mapDispatchToProps)(NewDoc);
