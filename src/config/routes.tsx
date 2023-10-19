import { lazy } from "react";
import { Route, Routes as Router } from "react-router-dom";
import { Fallback } from "../views/common/fallback.tsx";

const Admin = lazy(() => import("../views/admin/home"));
const AddProduct = lazy(() => import("../views/admin/addProduct"));
const ViewProducts = lazy(() => import("../views/admin/products.view.tsx"));
const ViewProduct = lazy(() => import("../views/admin/product.view.tsx"));
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
          <ViewProducts />
        </Fallback>
      }
    />
    <Route
      path="admin/products/:productId"
      element={
        <Fallback>
          <ViewProduct />
        </Fallback>
      }
    />
  </Router>
);
