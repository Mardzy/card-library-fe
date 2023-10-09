import { ReactNode, Suspense } from "react";

type FallbackType = { children: ReactNode };

export const Fallback = ({ children }: FallbackType) => (
  <Suspense fallback={<div>Loading!!!!!!!</div>}>{children}</Suspense>
);
