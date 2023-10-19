import { ReactNode, Suspense } from "react";

import { Loading } from "./loading.tsx";

type FallbackType = { children: ReactNode };

export const Fallback = ({ children }: FallbackType) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);
