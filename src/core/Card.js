import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { addItemCart, removeItemFromCart } from "./helper/cartHelper"
import ImageHelper from "./helper/ImageHelper"

const Card = ({
  product,
  addtoCart = true,
  removefromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  // State var
  const [redirect, setRedirect] = useState(false)

  //   const [count, setCount] = useState(product.count)

  // Display Values
  const cardTitle = product ? product.name : "A photo from pexels"
  const cardDescription = product ? product.description : "A photo from pexels"
  const cardPrice = product ? product.price : "X"

  const addToCart = () => {
    addItemCart(product, () => {
      setRedirect(true)
    })
  }

  const getARedirect = (redirect) => {
    if (redirect) {
      // console.log("redirect")
      return <Redirect to="/cart" />
    }
  }

  const showAddBtn = () => {
    return (
      addtoCart && (
        <div className="col-12">
          <button
            onClick={addToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2 rounded">
            Add to Cart
          </button>
        </div>
      )
    )
  }

  const showRemoveBtn = () => {
    return (
      removefromCart && (
        <div className="col-12">
          <button
            onClick={() => {
              removeItemFromCart(product._id)
              setReload(!reload)
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2 rounded">
            Remove from cart
          </button>
        </div>
      )
    )
  }

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead text-capitalize">{cardTitle}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap py-1 px-2 text-capitalize">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4 text-capitalize">
          Price : $ {cardPrice}
        </p>
        <div className="row">
          {showAddBtn()}
          {showRemoveBtn()}
        </div>
      </div>
      {getARedirect(redirect)}
    </div>
  )
}

export default Card
