import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "api";
import { Product } from "api/hooks";
import { AxiosResponse } from "axios";

export type FetchProductsResponse = {
  products: Product[];
  status: number;
};

const fetchProductsService = async (): Promise<FetchProductsResponse> => {
  const { data }: AxiosResponse<FetchProductsResponse> =
    await axiosClient.get("/products");

  return data;
};

export const useProducts = (noProducts: boolean) =>
  useQuery<FetchProductsResponse, Error>({
    queryKey: ["products", noProducts],
    queryFn: fetchProductsService,
    enabled: noProducts,
  });
