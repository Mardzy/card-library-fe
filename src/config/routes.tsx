import { lazy } from "react";
import { Route, Routes as Router } from "react-router-dom";
import { Fallback } from "../views/fallback.tsx";

const Admin = lazy(() => import("../views/admin/home"));
const AddProduct = lazy(() => import("../views/admin/addProduct"));
const ViewProducts = lazy(() => import("../views/admin/products"));
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
      path="admin/view-products"
      element={
        <Fallback>
          <ViewProducts />
        </Fallback>
      }
    />
  </Router>
);
