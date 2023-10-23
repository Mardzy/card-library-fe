import { axiosClient } from "api";
import { useMutation } from "@tanstack/react-query";

const deleteProductService = async (id: string): Promise<string> => {
  try {
    await axiosClient.delete(`/products/${id}`);

    return `Product with ID ${id} deleted`;
  } catch (err) {
    const error = err as Error;
    const message = `Add Product Service: ${error.message}`;
    console.error(message);

    return message;
  }
};

export const useDeleteProduct = () =>
  useMutation({
    mutationFn: (id: string) => deleteProductService(id),
    onError: (error: Error) => error,
    onSuccess: (message) => message,
  });
