import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../auth/helper"
import Base from "../core/Base"
import { getProducts, deleteProduct } from "./helper/adminapicall"

const ManageProducts = () => {
  // States
  const [products, setProducts] = useState([])

  const { user, token } = isAuthenticated()

  //   Preloading Functions
  const preload = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
    // console.dir(products)
  }

  useEffect(() => {
    preload()
  }, [])

  //   Delete product API call

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.dir(data.error)
      } else {
        preload()
      }
    })
  }

  return (
    <Base title="Welcome admin" description="Manage products here">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-md-1">
          <Link className="btn btn-danger rounded" to={`/admin/dashboard`}>
            <i className="fa fa-arrow-left" aria-hidden="true"></i>
          </Link>
        </div>
        <div className="col-md-10">
          <h2 className="text-white text-center">Product List</h2>
        </div>
        <div className="col-md-1"></div>
      </div>
      {/* Body */}
      <div className="row">
        <div className="col-12">
          {products.map((product, index) => (
            <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{product.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success rounded"
                  to={`/admin/product/update/${product._id}`}>
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button
                  onClick={() => {
                    deleteThisProduct(product._id)
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

export default ManageProducts
