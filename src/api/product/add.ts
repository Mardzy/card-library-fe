import { axiosClient } from "../axios";
import { AddProductType } from "components/forms";

/**
 * Add product to DB
 * @param product
 * @todo check if product already exists before sending
 * @todo send product to state
 */
export const addProductService = async (product: AddProductType) => {
  try {
    await axiosClient.post("/products", product, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    const error = err as Error;
    console.log(error.message, error.stack);
  }
};
