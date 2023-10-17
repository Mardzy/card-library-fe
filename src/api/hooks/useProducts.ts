import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../index.ts";

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

const fetchAllProducts = async (): Promise<FetchProductsResponse> => {
  const { data } = await axiosClient.get("/products");

  return data;
};

export const useProducts = (noProducts: boolean) =>
  useQuery<FetchProductsResponse, Error>({
    queryKey: ["products", noProducts],
    queryFn: fetchAllProducts,
    enabled: noProducts,
  });
