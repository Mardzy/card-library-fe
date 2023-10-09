import { useQuery } from "@tanstack/react-query";

import { fetchProductById, FetchProductByIdResponse } from "services/product";
import { useParams } from "react-router-dom";

function Product() {
  const { productId } = useParams();
  const id = productId || "";
  const { data, error, isLoading } = useQuery<FetchProductByIdResponse>({
    queryKey: [],
    queryFn: () => fetchProductById(id),
  });

  const err = error as Error;
  console.log("data: ", data);
  return isLoading ? (
    <div className="text-sm font-black">Loading...</div>
  ) : error ? (
    <div className="error">{err.message}</div>
  ) : (
    <div className="container h-screen w-full">
      <h1 className="text-4xl font-black">View Product</h1>
    </div>
  );
}

export default Product;
