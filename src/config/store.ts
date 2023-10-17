import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { createProductSlice, ProductsSlice } from "../slices/products.slice.ts";
import {
  ActiveProductSlice,
  createActiveProductSlice,
} from "../slices/activeProduct.slice.ts";

export type StateType = ProductsSlice & ActiveProductSlice;

const store = create<StateType>()(
  devtools(
    persist(
      (...a) => ({
        ...createProductSlice(...a),
        ...createActiveProductSlice(...a),
      }),
      {
        name: "productStore",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    { serialize: true },
  ),
);

export const useStore = () => store();
