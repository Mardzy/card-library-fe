import { Product } from "api/hooks/useProduct.ts";
import { axiosClient } from "api/axiosClient.ts";
import { useMutation } from "@tanstack/react-query";

type EditProductResponse = {
  product: Product;
  status: number;
};
const editProductService = async (
  product: Product,
): Promise<EditProductResponse> => {
  const { data } = await axiosClient.patch(`/products/${product.id}`, {
    ...product,
  });

  return data;
};

export const useEditProduct = () =>
  useMutation({
    mutationFn: (product: Product) => editProductService(product),
    onError: (error: Error) => {
      console.error(`Edit Product Service error: ${error.message}`);
      return error;
    },
    onSuccess: (data) => data,
  });
