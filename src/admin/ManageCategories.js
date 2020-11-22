import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../auth/helper"
import Base from "../core/Base"
import { getCategories, deleteCategory } from "./helper/adminapicall"

const ManageCategories = () => {
  // States
  const [categories, setCategories] = useState([])

  const { user, token } = isAuthenticated()

  //   Preloading Functions
  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setCategories(data)
      }
    })
    // console.dir(categories)
  }

  useEffect(() => {
    preload()
  }, [])

  //   Delete product API call

  const deleteThisCategories = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.dir(data.error)
      } else {
        preload()
      }
    })
  }

  return (
    <Base title="Welcome admin" description="Manage categories here">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-md-1">
          <Link className="btn btn-danger rounded" to={`/admin/dashboard`}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </Link>
        </div>
        <div className="col-md-10">
          <h2 className="text-white text-center">Categories List</h2>
        </div>
        <div className="col-md-1"></div>
      </div>
      {/* Body */}
      <div className="row">
        <div className="col-12">
          {categories.map((category, index) => (
            <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{category.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success rounded"
                  to={`/admin/category/update/${category._id}`}>
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button
                  onClick={() => {
                    deleteThisCategories(category._id)
                  }}
                  className="btn btn-danger rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  )
}
export default ManageCategories
