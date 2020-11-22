import React from "react"
import Menu from "./Menu"
import "../styles.css"

const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <Menu />

      <div className="container-fluid">
        {/* jumbotron starts */}
        <div className="jumbotron bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        {/* jumbotron ends */}
        {/* child starts */}
        <div className={className}>{children}</div>
        {/* child ends */}
      </div>

      {/* footer starts */}
      <footer className="footer bg-dark text-white mt-auto py-3">
        <div className="container-fluid bg-success text-center py-3">
          <h4>Feel Free to reach out!</h4>
          <button className="btn btn-warning btn-lg rounded">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">
            An Amazing <span className="text-white">MERN</span> Bootcamp
          </span>
        </div>
      </footer>
      {/* footer starts */}
    </div>
  )
}

export default Base
