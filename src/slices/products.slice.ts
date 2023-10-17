import { StateCreator } from "zustand";

import { Product } from "../api";

export type ProductsSlice = {
  products: Product[];
  addProduct: (product: Product) => void;
  fetchProductById: (id: string) => Product | undefined;
  removeProduct: (productId: string) => void;
  setProducts: (products: Product[]) => void;
};
export const createProductSlice: StateCreator<ProductsSlice> = (set, get) => ({
  products: [],
  addProduct: (product) => {
    set(({ products }) => ({ products: [...products, product] }));
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
  fetchProductById: (productId) =>
    get().products.find(({ id }) => id === productId),
});