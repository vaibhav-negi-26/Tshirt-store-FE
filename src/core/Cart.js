import React, { useState, useEffect } from "react"
import Base from "./Base"
import Card from "./Card"
import { loadCart } from "./helper/cartHelper"

const Cart = () => {
  // States
  const [products, setProducts] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    setProducts(loadCart())
  }, [reload])

  // Components
  const loadAllProduct = () => {
    return (
      <div className="row">
        <div className="col-md-12">
          <h2 className="mb-4 text-center">Your items in cart</h2>
        </div>
        {products.map((product, index) => {
          return (
            <div className="col-md-6 mb-3">
              <Card
                key={index}
                product={product}
                addtoCart={false}
                removefromCart={true}
                setReload={setReload}
                reload={reload}
              />
            </div>
          )
        })}
      </div>
    )
  }

  const loadCheckout = () => {
    return (
      <div>
        <h2>Section to checkout</h2>
      </div>
    )
  }

  return (
    <Base title="Cart Page" description="Manage your cart here!">
      <div className="row">
        <div className="col-md-6">{loadAllProduct()}</div>
        <div className="col-md-6">{loadCheckout()}</div>
      </div>
    </Base>
  )
}

export default Cart
