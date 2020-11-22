const { API } = require("../../backend")

export const getProducts = () => {
  return fetch(`${API}/all/product`, { method: "GET" })
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      console.log("Error from getProducts", err)
    })
}
