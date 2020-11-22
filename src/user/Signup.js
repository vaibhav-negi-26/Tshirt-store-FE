import React, { useState } from "react"
import { Link } from "react-router-dom"
import { signup } from "../auth/helper"
import Base from "../core/Base"

const Signup = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  })

  // destructure the state obj
  const { name, email, password, error, success } = values

  // Change handle function
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  // Submit handler
  const onSubmit = (event) => {
    event.preventDefault()
    // console.log({ onSubmit: values })
    setValues({ ...values, error: false })
    signup({ name, email, password })
      .then((data) => {
        // console.log(data)
        if (data.error) {
          setValues({ ...values, error: data.error, success: false })
        } else {
          setValues({
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          })
        }
      })
      .catch((err) => {
        console.log("Error in Signup")
        console.log(err)
      })
  }

  const successMessage = () => (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div
          className="alert alert-success"
          style={{ display: success ? "" : "none" }}>
          New Account Created Please Sign in <Link to="/signin">Here</Link>
        </div>
      </div>
    </div>
  )

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

  // component
  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                onChange={handleChange("name")}
                className="form-control"
                type="text"
                value={name}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                className="form-control"
                type="email"
                value={email}
                required
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type="password"
                value={password}
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
    <Base title="Sign Up Page" description="Page for users to Signup!">
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  )
}

export default Signup
