import { axiosClient } from "services/axios";

export type Product = {
  id: string;
  manufacturer: string;
  name: string;
  year: string;
};

export type FetchProductsResponse = {
  products: Product[];
  status: number;
};
/**
 * Fetch all items in PRODUCTS table
 *
 * @todo send product to state
 */
export const fetchAllProducts = async () => {
  const { data } = await axiosClient.get<FetchProductsResponse>("/products");

  return data;
};

export type FetchProductByIdResponse = {
  products: Product;
  status: number;
};

export const fetchProductById = async (product_id: string) => {
  const { data } = await axiosClient.get<FetchProductByIdResponse>(
    `/products/${product_id}`,
  );

  return data;
};
