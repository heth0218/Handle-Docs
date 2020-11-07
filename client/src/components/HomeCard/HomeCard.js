import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // flexWrap: "wrap",
    justifydocs: "space-between",
    // overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    marginTop: "30px",
    marginLeft: "100px",
    marginRight: "100px",
  },
  gridList: {
    width: "100%",
    height: "auto",
    margin: "30px",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

const HomeCard = (props) => {
  const classes = useStyles();

  const documentClickHandler = (id) => {
    props.history.push("/" + id);
  };

  const getColor = () => {
    let arr = [
      "#0af0e8",
      "#66f00a",
      "#f0380a",
      "#0a47f0",
      "#f0d10a",
      "#ec0af0",
    ];
    const num = Math.ceil(Math.random() * arr.length);

    return arr[num];
  };

  return (
    <div className={classes.root}>
      <GridList cellHeight={250} className={classes.gridList} cols={2}>
        {props.docs.map((doc, index) => (
          <GridListTile key={doc.imageUrl} cols={1}>
            <img
              src={doc.imageUrl}
              alt={doc.title}
              onClick={() => documentClickHandler(doc._id)}
            />
            <GridListTileBar
              title={
                <span
                  className="brand-logo techName"
                  style={{ color: getColor() }}
                >
                  {doc.title}
                </span>
              }
              subtitle={
                <span className="authorName">--by: {doc.author.name}</span>
              }
              actionIcon={
                <IconButton
                  aria-label={`info about ${doc.title}`}
                  //className={classes.icon}
                  onClick={() => documentClickHandler(doc._id)}
                >
                  <ArrowForwardIosIcon style={{ color: getColor() }} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default withRouter(HomeCard);
