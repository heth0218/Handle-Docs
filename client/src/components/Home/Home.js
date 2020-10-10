import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import HomeCard from "../HomeCard/HomeCard";
import { fetchAllDocs, filterDocs, clearFilterDocs } from "../../actions/newDocs";

const Home = (props) => {
  const text = useRef("");
  useEffect(() => {
    props.onFetchAllDocs();
  }, []);

  const createNewDocHandler = () => {
    props.history.push("/newDoc");
  };

  const onClickClose = () => {
    text.current.value = "";
    props.onClearFilterDocs();
  };

  const searchHandler = (event) => {
    if(event.target.value !== '') {
      props.onFilterDocs(event.target.value);
    } else {
      props.onClearFilterDocs();
    }
  }

  let load = false;
  if (props.user !== null) {
    load = true;
  }

  return props.docs ? 
    <div>
    <div className="container s12 m10" style={{marginTop: "50px"}}>
        <nav
          className="teal darken-2"
          style={{
            marginBottom: "30px",
          }}
        >
          <div className="nav-wrapper">
            <form>
              <div className="input-field">
                <input
                  id="search"
                  type="search"
                  placeholder="Search Documentation.."
                  ref={text}
                  onChange={(event) => searchHandler(event)}
                  required
                />
                <label className="label-icon" htmlFor="search">
                  <i className="material-icons">search</i>
                </label>
                <i className="material-icons" onClick={onClickClose}>
                  close
                </i>
              </div>
            </form>
          </div>
        </nav>
      </div>
      {props.docs && props.filteredDocs ? <HomeCard docs={props.filteredDocs} /> : <HomeCard docs={props.docs} />}
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
    </div> : null
  ;
};

const mapStateToProps = (state) => {
  return {
    docs: state.docs.docs,
    filteredDocs: state.docs.filtered,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchAllDocs: () => dispatch(fetchAllDocs()),
    onFilterDocs: (text) => dispatch(filterDocs(text)),
    onClearFilterDocs: () => dispatch(clearFilterDocs())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
