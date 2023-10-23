import { StateCreator } from "zustand";

import { Product } from "api/hooks";

export type ProductsSlice = {
  products: Product[];
  addProduct: (product: Product) => void;
  clearProducts: () => void;
  fetchProductById: (id: string) => Product | undefined;
  deleteProduct: (productId: string) => void;
  setProducts: (products: Product[]) => void;
  updateProduct: (product: Product) => void;
};

export const createProductSlice: StateCreator<ProductsSlice> = (set, get) => ({
  products: [],
  addProduct: (product) => {
    set(({ products }) => ({ products: [...products, product] }));
  },
  setProducts: (products: Product[]) => {
    set(() => ({ products }));
  },
  clearProducts: () => {
    set(() => ({ products: [] }));
  },
  deleteProduct: (productId) => {
    set((state) => {
      const products = state.products.filter(
        (product) => productId != product.id,
      );

      return { products };
    });
  },
  fetchProductById: (productId) =>
    get().products.find(({ id }) => id === productId),
  updateProduct: (product: Product) => {
    const filteredProducts = get().products.filter(
      ({ id }) => id !== product.id,
    );

    set(() => ({ products: [product, ...filteredProducts] }));
  },
});
