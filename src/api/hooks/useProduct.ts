import { axiosClient } from "../index.ts";
import { useQuery } from "@tanstack/react-query";

type Card = {};

export type Product = {
  id: string;
  manufacturer: string;
  name: string;
  year: string;
  cards?: Card[];
};

export type FetchProductByIdResponse = {
  product: Product;
  status: number;
};

const fetchProductById = async (product_id: string) => {
  const { data } = await axiosClient.get<FetchProductByIdResponse>(
    `/products/${product_id}`,
  );

  return data;
};

export const useProduct = (productId: string, noProduct: boolean) =>
  useQuery<FetchProductByIdResponse, Error>({
    queryKey: [],
    queryFn: async () => await fetchProductById(productId),
    enabled: noProduct,
  });
