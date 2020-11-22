import React, { useState, useEffect } from "react"
import Base from "./Base"
import Card from "./Card"
import { getProducts } from "./helper/coreapicalls"

const Home = () => {
  // States
  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

  // Preloading function
  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error)
        console.log({ error })
      } else {
        setProducts(data)
      }
    })
  }

  useEffect(() => {
    loadAllProducts()
  }, [])

  return (
    <Base title="Home Page" description="All  of t-shirts">
      <div className="row">
        {products.map((product, index) => {
          return (
            <div key={index} className="col-md-4 mb-4">
              <Card product={product} />
            </div>
          )
        })}
      </div>
    </Base>
  )
}

export default Home
