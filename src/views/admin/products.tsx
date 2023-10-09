import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { fetchAllProducts, FetchProductsResponse } from "services/product";
import { useEffect } from "react";
import { useProductStore } from "config/store.ts";

function Products() {
  const { products, setProducts } = useProductStore();

  const noProducts = !products.length;
  const { data, error, isLoading } = useQuery<FetchProductsResponse>({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
    enabled: noProducts,
  });

  const err = error as Error;

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
  }, [data, setProducts]);
  return isLoading && noProducts ? (
    <div className="text-sm font-black">Loading...</div>
  ) : error ? (
    <div className="error">{err.message}</div>
  ) : (
    <div className="container h-screen w-full flex flex-col">
      <h1 className="text-4xl font-black">View Products</h1>
      {products?.map(({ id, name }) => (
        <Link to={`admin/product/${id}`} className="text-lg pt-5" key={id}>
          {name}
        </Link>
      ))}
    </div>
  );
}

export default Products;
