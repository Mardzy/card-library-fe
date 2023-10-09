import { StoreApi } from "zustand";

import { Product } from "services/product";
import { StateType } from "config/store.ts";

export type ProductSlice = {
  products: Product[];
  addProduct: (product: Product) => void;
  fetchProductById: (id: string) => Product | undefined;
  removeProduct: (productId: string) => void;
  setProducts: (products: Product[]) => void;
  updateProduct: (updatedProduct: Product) => void;
};
export const createProductSlice = (
  set: StoreApi<StateType>["setState"],
  get: StoreApi<StateType>["getState"],
): ProductSlice => ({
  products: [],
  addProduct: (product) => {
    set((state) => ({ products: [...state.products, product] }));
  },
  removeProduct: (productId) => {
    set((state) => {
      const products = state.products.filter(
        (product) => productId != product.id,
      );

      return { products };
    });
  },
  setProducts: (products: Product[]) => {
    set(() => ({ products }));
  },
  fetchProductById: (productId) => {
    const product = get().products.find(({ id }) => id === productId);
    console.log("Product", productId, product);
    return product;
  },
  updateProduct: (updatedProduct) => {
    set((state) => {
      const products = state.products.filter(
        (product) => updatedProduct.id != product.id,
      );

      return { products: [...products, updatedProduct] };
    });
  },
});
