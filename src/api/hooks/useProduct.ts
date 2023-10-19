import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "api";

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

const fetchProductByIdService = async (
  product_id: string,
): Promise<FetchProductByIdResponse> => {
  const { data } = await axiosClient.get<FetchProductByIdResponse>(
    `/products/${product_id}`,
  );

  return data;
};

export const useProduct = (productId: string, noProduct: boolean) =>
  useQuery<FetchProductByIdResponse, Error>({
    queryKey: ["activeProduct", noProduct],
    queryFn: async () => await fetchProductByIdService(productId),
    enabled: noProduct,
  });
