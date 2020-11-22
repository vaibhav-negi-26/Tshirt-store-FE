import { API } from "../../backend"

// signup
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      console.log("Then Method of helper")
      return res.json()
    })
    .catch((err) => {
      console.log(err)
    })
}

// signup
export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log(err)
    })
}

// Dependent function like middle ware
// sets JWT token
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data))
    next()
  }
}

// signout
export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt")
    next()
  }

  return fetch(`${API}/signout`, {
    method: "GET",
  })
    .then((res) => {
      console.log("Signout Success")
    })
    .catch((err) => {
      console.log("Signout Failed", err)
    })
}

// Checker
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    console.log("window not present")
    return false
  }

  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"))
  } else {
    // console.log("jwt not present")
    return false
  }
}
