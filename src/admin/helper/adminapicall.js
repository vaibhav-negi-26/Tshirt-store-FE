import { API } from "../../backend"

// Category APIs
// Create Category API call
export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log("Error", err)
    })
}
// Get all categories API call
export const getCategories = () => {
  return fetch(`${API}/all/category`, { method: "GET" })
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log("Error", err)
    })
}

export const getCategory = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, { method: "GET" })
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log("Error", err)
    })
}

export const UpdateaCategory = (categoryId, userId, token, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log("Error", err)
    })
}
export const deleteCategory = (categoryId, userId, token) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log("Error", err)
    })
}

// Product APIs
// Create Product API call
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log("Error", err)
    })
}

// Get a Product API call
export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, { method: "GET" })
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log("Error", err)
    })
}
// Get all Products API call
export const getProducts = () => {
  return fetch(`${API}/all/product`, { method: "GET" })
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log("Error", err)
    })
}

// Update Product API call
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log("Error", err)
    })
}

// Delete Product API call
export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log("Error", err)
    })
}
