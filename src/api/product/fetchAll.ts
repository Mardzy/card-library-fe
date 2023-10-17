import { axiosClient } from "../axios";

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

export const fetchProductById = async (product_id: string) => {
  const { data } = await axiosClient.get<FetchProductByIdResponse>(
    `/products/${product_id}`,
  );

  return data;
};
