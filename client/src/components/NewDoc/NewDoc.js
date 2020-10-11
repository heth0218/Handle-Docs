import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import M from 'materialize-css/dist/js/materialize.min.js';
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { addNewDoc } from "../../actions/newDocs";
import firebase from './firebase'
import { Player } from 'video-react';


const NewDoc = (props) => {
  const [number, setNumber] = useState([Math.random()]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState([{ text: "" }]);
  const [files, setFiles] = useState();
  const [url, setUrl] = useState();



  useEffect(() => {
    if (url) {
      props.onAddNewDoc(title, content, imageUrl, url);
    }
  }, [url])


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
    if (!files) {
      return M.toast({ html: "Please insert a video!" });

    }
    let bucketName = 'images';
    let file = files[0];
    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    await uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      let downloadURL = uploadTask.snapshot.downloadURL
    })

    storageRef = firebase.storage().ref();

    const vidurl = await storageRef.child('images/' + files[0].name).getDownloadURL();
    console.log(vidurl)
    M.toast({ html: "Video saved successfully" });
    setUrl(vidurl)
  };

  const handleChange = (file) => {
    setFiles(file)
  }

  const showImage = async () => {
    if (!files) {
      return M.toast({ html: 'Please upload a video to show!!' })

    }
    let storageRef = firebase.storage().ref();
    // let spaceRef = storageRef.child('images/' + files[0].name);
    // storageRef.child('images/' + files[0].name).getDownloadURL().then((url) => {
    //     console.log(url);
    //     setUrl(url)
    // })
    const url = await storageRef.child('images/' + files[0].name).getDownloadURL();
    console.log(url)
    setUrl(url)

    if (!url) {
      return M.toast({ html: 'Please upload a video to show!!' })
    }
  }

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
        <div className="container" >
          <h1 style={{ marginTop: '100px' }}>
            <span class="grey-text">Upload</span>
            <span className="teal-text"> Lecture</span>
            <br /><br />
          </h1>
          <div class="file-field input-field">
            <div class="btn">
              <span>Video</span>
              <input type="file" onChange={(e) => { handleChange(e.target.files) }} />
            </div>
            <div class="file-path-wrapper">
              <input class="file-path validate" type="text" />
            </div>
          </div>
          {/* <button class="btn waves-effect waves-light" type="submit" name="action" onClick={handleSave}>Save
    <i class="material-icons right">send</i>
          </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
          <button class="btn waves-effect waves-light" type="submit" name="action" onClick={showImage}>Show the video I uploaded
    <i class="material-icons right">movie</i>
          </button>
          <div style={{ "height": "auto", "width": "300px", "marginLeft": "500px" }}>
            {url && <Player>
              <source src={url} />
            </Player>}
          </div>
        </div>
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
    onAddNewDoc: (title, content, imageUrl, url) =>
      dispatch(addNewDoc(title, content, imageUrl, url)),
  };
};

export default connect(null, mapDispatchToProps)(NewDoc);
