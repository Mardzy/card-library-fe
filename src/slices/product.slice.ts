import { StoreApi } from "zustand";

import { Product } from "services/product";
import { StateType } from "config/store.ts";

export type ProductSlice = {
  products: Product[];
  addProduct: (product: Product) => void;
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
    const { products: existingProducts } = get();
    if (existingProducts === products) {
    }
    set(() => ({ products }));
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
