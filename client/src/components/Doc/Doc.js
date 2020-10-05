import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { fetchDoc } from "../../actions/newDocs";

const useStyles = makeStyles({
  root: {
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Doc = (props) => {
  useEffect(() => {
    props.onFetchDoc(props.match.params.id);
  }, []);

  const classes = useStyles();
  if (props.doc !== null) {
  }

  return props.doc !== null ? (
    <div style={{ marginTop: "10px" }}>
      <h2 style={{ margin: "auto", textAlign: "center" }}>{props.doc.title}</h2>
      {props.doc.doc.map((doc) => {
        return (
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
              <Button size="small" color="white">
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
    doc: state.docs.selectedDoc,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchDoc: (id) => dispatch(fetchDoc(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doc);
