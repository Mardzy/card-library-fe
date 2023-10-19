import { axiosClient } from "../axiosClient.ts";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";

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
export const addProductService = async (
  product: AddProductType,
): Promise<void> => {
  try {
    await axiosClient.post("/products", product);
  } catch (err) {
    const error = err as Error;
    console.log(`Add Product Service: ${error.message}`);
  }
};

export const useAddProduct = () =>
  useMutation({
    mutationFn: addProductService,
  });
