export const addItemCart = (item, next) => {
  let cart = []
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    cart.push({
      ...item,
      count: 1,
    })
    // console.log(cart)
    localStorage.setItem("cart", JSON.stringify(cart))
    next()
  } else {
    console.log("Window not accessible for adding item to cart")
  }
}

export const removeItemFromCart = (productId) => {
  let cart = []
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"))
    }
    cart.map((product, i) => {
      if (product._id === productId) {
        cart.splice(i, 1)
      }
    })
    localStorage.setItem("cart", JSON.stringify(cart))
    return cart
  } else {
    console.log("Window not accessible for removing item to cart")
  }
}

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"))
    }
  } else {
    console.log("Window not accessible for loading cart")
  }
}

export const cartEmpty = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart")
    next()
  } else {
    console.log("Window not accessible for loading cart")
  }
}
