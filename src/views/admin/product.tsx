import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { fetchAllProducts, FetchProductsResponse } from "services/product";

function Product() {
  const { data, error, isLoading } = useQuery<FetchProductsResponse>({
    queryKey: ["product"],
    queryFn: fetchAllProducts,
    retry: 2,
  });

  const err = error as Error;

  return isLoading ? (
    <div className="text-sm font-black">Loading...</div>
  ) : error ? (
    <div className="error">{err.message}</div>
  ) : (
    <div className="container h-screen w-full">
      <h1 className="text-4xl font-black">View Products</h1>
      {data?.products?.map(({ id, name }) => (
        <Link to={`admin/product/${id}`} className="text-lg" key={id}>
          {name}
        </Link>
      ))}
    </div>
  );
}

export default Product;
