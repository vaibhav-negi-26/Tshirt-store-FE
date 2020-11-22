import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import Base from "../core/Base"
import { signin, authenticate, isAuthenticated } from "../auth/helper"

const Signin = () => {
  // state
  const [values, setValues] = useState({
    email: "admin@gmail.com",
    password: "boss@admin",
    error: "",
    loading: false,
    didRedirect: false,
  })

  // destructure
  const { email, password, error, loading, didRedirect } = values
  const { user } = isAuthenticated()

  // Change handle function
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const performRedirect = () => {
    // condition for redirecting to dashboard
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/user/dashboard" />
      }
    }

    // condition for already logedin
    if (isAuthenticated()) {
      console.log("Self redirect")
      return <Redirect to="/" />
    }
  }

  const onSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: false, loading: true })
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false })
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true })
          })
        }
      })
      .catch((err) => {
        console.log("Sign in request failed")
        console.log(err)
      })
  }

  const loadigMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    )
  }

  const errorMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}>
          {error}
        </div>
      </div>
    </div>
  )

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                value={email}
                className="form-control"
                type="email"
                required
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                value={password}
                className="form-control"
                type="password"
                required
              />
            </div>
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <Base title="Sign In Page" description="Page for users to Signin!">
      {loadigMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  )
}

export default Signin
