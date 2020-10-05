import React, { useEffect } from "react";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import HomeCard from "../HomeCard/HomeCard";
import { fetchAllDocs } from "../../actions/newDocs";

const Home = (props) => {
  useEffect(() => {
    props.onFetchAllDocs();
  }, []);

  const createNewDocHandler = () => {
    props.history.push("/newDoc");
  };

  let load = false;
  if (props.user !== null) {
    load = true;
  }

  return (
    <div>
      <HomeCard docs={props.docs} />
      {load ? (
        props.user.role === "admin" ? (
          <Fab
            color="primary"
            aria-label="add"
            style={{ float: "right", marginRight: "20px" }}
            onClick={createNewDocHandler}
          >
            <AddIcon />
          </Fab>
        ) : null
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    docs: state.docs.docs,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAllDocs: () => dispatch(fetchAllDocs()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
