import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

import { createProductSlice, ProductSlice } from "../slices/product.slice.ts";

export type StateType = ProductSlice;

const store = create<StateType>()(
  devtools(
    persist(
      (set, get) => ({
        ...createProductSlice(set, get),
      }),
      {
        name: "productStore",
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export const useStore = () => store();
