import { lazy } from "react";
import { Route, Routes as Router } from "react-router-dom";
import { Fallback } from "../views/common";

const Admin = lazy(() => import("../views/admin/admin.home.view"));
const AddProduct = lazy(() => import("../views/admin/add.product.view"));
const Products = lazy(() => import("../views/admin/products.view"));
const Product = lazy(() => import("../views/admin/product.view"));
const EditProduct = lazy(() => import("../views/admin/edit.product.view"));
const Home = lazy(() => import("../views/home"));

export const Routes = () => (
  <Router>
    <Route
      path="/"
      element={
        <Fallback>
          <Home />
        </Fallback>
      }
    />
    <Route
      path="admin"
      element={
        <Fallback>
          <Admin />
        </Fallback>
      }
    />
    <Route
      path="admin/add-product"
      element={
        <Fallback>
          <AddProduct />
        </Fallback>
      }
    />
    <Route
      path="admin/products"
      element={
        <Fallback>
          <Products />
        </Fallback>
      }
    />
    <Route
      path="admin/products/:productId"
      element={
        <Fallback>
          <Product />
        </Fallback>
      }
    />
    <Route
      path="admin/products/:productId/edit"
      element={
        <Fallback>
          <EditProduct />
        </Fallback>
      }
    />
  </Router>
);
