import React, { useState } from "react"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../auth/helper"
// Importing components
import Base from "../core/Base"
// Importing API call functions
import { createCategory } from "./helper/adminapicall"

const AddCategory = () => {
  const [name, setName] = useState("")
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const { user, token } = isAuthenticated()

  const goBack = () => {
    return (
      <div className="mb-4">
        <Link to="/admin/dashboard" className="btn btn-outline-danger rounded">
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </Link>
      </div>
    )
  }

  const handleChange = (event) => {
    setError("")
    setName(event.target.value)
  }

  const onSubmit = (event) => {
    // Handling events for new request
    event.preventDefault()
    setError("")
    setSuccess(false)

    // Making request
    createCategory(user._id, token, { name }).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setError("")
        setSuccess(true)
        setName("")
      }
    })
  }

  const successMessage = () =>
    success && (
      <div className="alert alert-success">
        <h6>Category Created</h6>
      </div>
    )

  const errorMessage = () =>
    error && (
      <div className="alert alert-danger">
        <h6>{error}</h6>
      </div>
    )

  const myCategoryForm = () => {
    return (
      <form>
        <div className="form-group">
          <h3 className="mb-3">Enter the category</h3>
          <input
            type="text"
            onChange={handleChange}
            value={name}
            className="form-control"
            placeholder="For Eg. Summer"
          />
          <button
            onClick={onSubmit}
            className="mt-4 btn btn-outline-info rounded">
            Create Category
          </button>
        </div>
      </form>
    )
  }

  return (
    <Base
      title="Create a category here"
      description="Add a new category for tshirts"
      className="container my-4 p-4 text-white rounded bg-custom">
      <div className="row">
        <div className="col-md-2">{goBack()}</div>
        <div className="col-md-10">
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  )
}

export default AddCategory
