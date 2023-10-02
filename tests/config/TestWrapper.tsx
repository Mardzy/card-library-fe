import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type TestWrapperType = {
  children: ReactNode;
};
const queryClient = new QueryClient();
export const TestWrapper = ({ children }: TestWrapperType) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
