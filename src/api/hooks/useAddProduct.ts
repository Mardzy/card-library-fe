import { axiosClient } from "api";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";

import { Product } from "api/hooks/useProduct.ts";

export const AddProductSchema = z.object({
  manufacturer: z.string().min(3).max(40),
  year: z.string().min(4).max(10),
  name: z.string().min(3).max(70),
  fileData: z.string().min(3).max(999999999),
});

export type AddProductType = z.infer<typeof AddProductSchema>;
/**
 * Add product to DB
 * @param product
 */

type FetchProductsResponse = {
  products: Product[];
  status: number;
};

export const addProductService = async (
  product: AddProductType,
): Promise<FetchProductsResponse> => {
  const { data } = await axiosClient.post("/products", product);
  return data;
};

export const useAddProduct = () =>
  useMutation({
    mutationFn: addProductService,
    onSuccess: (data) => {
      return data;
    },
    onError: (error: Error) => {
      console.log(`Add Product Service: ${error.message}`);
      return error;
    },
  });
