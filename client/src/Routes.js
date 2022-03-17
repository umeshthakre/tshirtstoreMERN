import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddCategory from "./admin/AddCategory";
import ManegeCategories from "./admin/ManegeCategories";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import Home from "./core/Home";
import AdminDashboard from "./user/AdminDashBoard";
import SignIn from "./user/Signin";
import SignUp from "./user/Signup";
import UserDashboard from "./user/UserDashBoard";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/UpdateCategory";
import Cart from "./core/Cart";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/cart" component={Cart} />
        <PrivateRoute exact path="/user/dashboard" component={UserDashboard} />
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute
          exact
          path="/admin/create/category"
          component={AddCategory}
        />
        <AdminRoute
          exact
          path="/admin/categories"
          component={ManegeCategories}
        />
        <AdminRoute exact path="/admin/create/product" component={AddProduct} />
        <AdminRoute exact path="/admin/product" component={ManageProducts} />
        <AdminRoute
          exact
          path="/admin/product/update/:productId"
          component={UpdateProduct}
        />
        <AdminRoute
          exact
          path="/admin/category/update/:categoryId"
          component={UpdateCategory}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
