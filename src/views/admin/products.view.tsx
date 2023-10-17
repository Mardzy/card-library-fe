import * as React from "react";
import { Link } from "react-router-dom";

import { useStore } from "config/store.ts";
import { useProducts } from "../../api/hooks/useProducts.ts";
import { Product } from "../../api";

const { useEffect, useState } = React;

function Products() {
  const { products, setProducts, setActiveProduct } = useStore();
  const noProducts = !products.length;
  const [err, setError] = useState<Error | null>(null);
  const { data, error, isLoading } = useProducts(noProducts);

  useEffect(() => {
    if (data) {
      setProducts(data.products);
    }
    setError(err);
  }, [data, err, setProducts]);

  return isLoading && noProducts ? (
    <div className="text-sm font-black">Loading...</div>
  ) : error ? (
    <div className="error">{err?.message}</div>
  ) : (
    <div className="container h-screen w-full flex flex-col">
      <h1 className="text-4xl font-black">View Products</h1>
      {products?.map((product) => {
        const formatFullName = ({
          cards,

          manufacturer,
          name,
          year,
        }: Product): string =>
          `${year} ${manufacturer} ${name} with ${cards?.length} cards`;
        return (
          <Link
            onClick={() => {
              setActiveProduct(product);
            }}
            to={`/admin/products/${product.id}`}
            className="text-lg pt-5"
            key={product.id}
          >
            {formatFullName(product)}
          </Link>
        );
      })}
    </div>
  );
}

export default Products;
