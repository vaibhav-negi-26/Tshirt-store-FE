import React from "react"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../auth/helper"
import Base from "../core/Base"

const AdminDashBoard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated()

  // Left side
  const AdminLeftSide = () => {
    return (
      <div className="card text-dark mb-4">
        <h4 className="card-header bg-success text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item lead font-weight-normal">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Category
            </Link>
          </li>
          <li className="list-group-item lead font-weight-normal">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage Category
            </Link>
          </li>
          <li className="list-group-item lead font-weight-normal">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item lead font-weight-normal">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
          <li className="list-group-item lead font-weight-normal">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  // Right side
  const AdminRightSide = () => {
    return (
      <div className="card text-dark">
        <h4 className="card-header bg-success text-white">Admin Info</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <h4>
              <span className="badge badge-success"> Name: </span> {name}
            </h4>
          </li>
          <li className="list-group-item">
            <h4>
              <span className="badge badge-success"> Email: </span> {email}
            </h4>
          </li>
          <li className="list-group-item">
            <h4>
              <span className="badge badge-danger"> Admin Privileges </span>
            </h4>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <Base
      title="Welcome to admin area"
      description="Manage all of your products here">
      <div className="row">
        <div className="col-md-3">{AdminLeftSide()}</div>
        <div className="col-md-9">{AdminRightSide()}</div>
      </div>
    </Base>
  )
}

export default AdminDashBoard
