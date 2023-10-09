import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import type { Product } from "services/product";

interface ProductStoreState {
  products: Product[];

  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  setProducts: (products: Product[]) => void;
  updateProduct: (updatedProduct: Product) => void;
}

const productsStore = create<ProductStoreState>()(
  devtools(
    persist(
      (set, get) => ({
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
      }),
      {
        name: "productStore",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export const useProductStore = () => productsStore();
