import { StateCreator } from "zustand";

import type { Product } from "api/hooks/useProduct.ts";

export type ActiveProductSlice = {
  activeProduct: Product;
  clearActiveProduct: () => void;
  setActiveProduct: (product: Product) => void;
};
export const emptyProduct = {} as Product;
export const createActiveProductSlice: StateCreator<ActiveProductSlice> = (
  set,
) => ({
  activeProduct: emptyProduct,
  clearActiveProduct: () => {
    set(() => ({ activeProduct: emptyProduct }));
  },
  setActiveProduct: (product) => {
    set(() => ({ activeProduct: product }));
  },
});
