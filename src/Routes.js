import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
// Importing Private Routes
import PrivateRoutes from "./auth/helper/PrivateRoutes"
import AdminRoutes from "./auth/helper/AdminRoutes"

// Importing Components
import Home from "./core/Home"
import Signin from "./user/Signin"
import Signup from "./user/Signup"
import UserDashBoard from "./user/UserDashBoard"
import AdminDashBoard from "./user/AdminDashBoard"
// Admin components
import AddCategory from "./admin/AddCategory"
import ManageCategories from "./admin/ManageCategories"
import UpdateCategory from "./admin/UpdateCategory"
import AddProduct from "./admin/AddProduct"
import ManageProducts from "./admin/ManageProducts"
import UpdateProduct from "./admin/UpdateProduct"
import Cart from "./core/Cart"

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Normal Routes */}
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/cart" exact component={Cart} />
        {/* Private Routes */}
        <PrivateRoutes path="/user/dashboard" exact component={UserDashBoard} />
        {/* Admin Routes */}
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashBoard} />
        <AdminRoutes
          path="/admin/create/category"
          exact
          component={AddCategory}
        />
        <AdminRoutes
          path="/admin/categories"
          exact
          component={ManageCategories}
        />
        <AdminRoutes
          path="/admin/category/update/:categoryId"
          exact
          component={UpdateCategory}
        />
        <AdminRoutes
          path="/admin/create/product"
          exact
          component={AddProduct}
        />
        <AdminRoutes path="/admin/products" exact component={ManageProducts} />
        <AdminRoutes
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
