import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../auth/helper"
import Base from "../core/Base"
import { createProduct, getCategories } from "./helper/adminapicall"

const AddProduct = () => {
  // State
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formdata: "",
  })

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formdata,
  } = values

  const { user, token } = isAuthenticated()
  //   Computation functions
  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, categories: data, formdata: new FormData() })
      }
    })
  }

  useEffect(() => {
    preload()
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: "", loading: true })
    createProduct(user._id, token, formdata).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false })
      } else {
        // console.log(data.product)
        // console.log(data.product.name)
        setValues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          loading: false,
          createdProduct: data.product.name,
        })
      }
    })
  }

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value
    formdata.set(name, value)
    setValues({ ...values, [name]: value, error: "" })
  }

  // Component functions
  const goBack = () => {
    return (
      <div className="mb-4">
        <Link to="/admin/dashboard" className="btn btn-outline-danger rounded">
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
        </Link>
      </div>
    )
  }

  const createProductForm = () => (
    <form>
      <div className="form-group">
        <h3 className="mb-3">Enter the details</h3>
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category">
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-md-5 btn">
            <h4>
              <span className="badge badge-success">Upload Photo</span>
            </h4>
          </div>
          <div className="col-md-5 btn">
            <input
              onChange={handleChange("photo")}
              type="file"
              name="photo"
              accept="image"
              placeholder="choose a file"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-info rounded">
        Create Product
      </button>
    </form>
  )

  const loadigMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    )
  }

  const successMessage = () =>
    createdProduct && (
      <div className="alert alert-success">
        <h6>{createdProduct} Successfully Created</h6>
      </div>
    )

  const errorMessage = () =>
    error && (
      <div className="alert alert-danger">
        <h6>{error}</h6>
      </div>
    )

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container my-4 p-4 text-white rounded bg-custom">
      <div className="row">
        <div className="col-md-2">{goBack()}</div>
        <div className="col-md-10">
          {/* {loadigMessage()} */}
          {successMessage()}
          {errorMessage()}
          <h1>{createProductForm()}</h1>
        </div>
      </div>
    </Base>
  )
}

export default AddProduct
