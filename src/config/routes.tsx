import { lazy } from "react";
import { Route, Routes as Router } from "react-router-dom";

const Admin = lazy(() => import("../views/admin/home"));
const AddProduct = lazy(() => import("../views/admin/addProduct"));
const ViewProducts = lazy(() => import("../views/admin/products"));
const Home = lazy(() => import("../views/home"));

export const Routes = () => (
  <Router>
    <Route path="/" element={<Home />} />
    <Route path="admin" element={<Admin />} />
    <Route path="admin/add-product" element={<AddProduct />} />
    <Route path="admin/view-products" element={<ViewProducts />} />
  </Router>
);
