import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/userActions";
import M from "materialize-css/dist/js/materialize.min.js";

const Navbar = ({ user: { user, isAuthenticated }, logout, icon, title }) => {
  const onLogout = () => {
    logout();
    M.toast({ html: "Successfully logged out" });
  };

  return (
    <div>
      <div className="navbar">
        <nav className="teal">
          <div className="container">
            <div className="nav-wrapper">
              {/* <a href="#" data-target="slide-out" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a> */}
              <a href="/" className="brand-logo">
                Handle Docs
              </a>
              <ul className="right hide-on-med-and-down">
                {isAuthenticated ? (
                  <Fragment>
                    <li>
                      <Link to="/" className="brand-logo brand-logo1 ">
                        Home
                      </Link>
                    </li>
                    <li>
                      <span className="brand-logo brand-logo1 brand-logo3">
                        &nbsp;&nbsp;&nbsp;Hi, {user.name}
                      </span>
                    </li>
                    &nbsp;&nbsp;
                    <li>
                      <a onClick={onLogout} href="/login">
                        <i className="fas fa-sign-out-alt"></i>
                        {/* <span className="hide-sm">Logout</span> */}
                      </a>
                    </li>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <li>
                      <img
                        src={user.imageUrl}
                        alt=""
                        height="50"
                        width="50"
                        style={{ marginTop: 5 }}
                        className="circle"
                      ></img>
                    </li>
                  </Fragment>
                ) : (
                  <Fragment>
                    <li>
                      <Link to="/register" className="waves-effect waves-light">
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link to="/login" className="waves-effect waves-light">
                        Login
                      </Link>
                    </li>
                  </Fragment>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

Navbar.defaultProps = {
  title: "Galatz",
  icon: "fas fa-pizza-slice",
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
