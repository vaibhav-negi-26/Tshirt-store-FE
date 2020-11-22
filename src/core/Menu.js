import React, { Fragment } from "react"
import { Link, withRouter } from "react-router-dom"
import { signout, isAuthenticated } from "../auth/helper/index"

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" }
  } else {
    return { color: "#FFFFFF" }
  }
}

const Menu = ({ history }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link style={currentTab(history, "/")} className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/cart")}
              className="nav-link"
              to="/cart">
              Cart
            </Link>
          </li>
          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
              <Link
                style={currentTab(history, "/user/dashboard")}
                className="nav-link"
                to="/user/dashboard">
                U. Dashboard
              </Link>
            </li>
          )}
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
              <Link
                style={currentTab(history, "/admin/dashboard")}
                className="nav-link"
                to="/admin/dashboard">
                A. Dashboard
              </Link>
            </li>
          )}
          {!isAuthenticated() && (
            <Fragment>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signin")}
                  className="nav-link"
                  to="/signin">
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  style={currentTab(history, "/signup")}
                  className="nav-link"
                  to="/signup">
                  Sign Up
                </Link>
              </li>
            </Fragment>
          )}
          {isAuthenticated() && (
            <li className="nav-item">
              <span
                style={{ cursor: "pointer" }}
                className="nav-link text-warning"
                onClick={() => {
                  signout(() => {
                    history.push("/")
                  })
                }}>
                Sign Out
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Menu)
