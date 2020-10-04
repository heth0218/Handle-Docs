import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Navbar from "./components/layout/Navbar";
import File from "./components/File";
import Doc from "./components/Doc/Doc";
import Home from "./components/Home/Home";
import NewDoc from "./components/NewDoc/NewDoc";
import { loadUser } from "./actions/userActions";

function App(props) {
  useEffect(() => {
    //Initializes materialize js
    M.AutoInit();
    props.onLoadUser();
  }, [props]);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/file" component={File} />
        <Route exact path="/newDoc" component={NewDoc} />
        <Route exact path="/" component={Home} />
        <Route exact path="/:id" component={Doc} />
      </Switch>
    </Router>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadUser: () => dispatch(loadUser()),
  };
};

export default connect(null, mapDispatchToProps)(App);
