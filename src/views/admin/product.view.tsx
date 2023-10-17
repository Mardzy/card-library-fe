import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useStore } from "config/store.ts";
import { useProduct } from "../../api/hooks/useProduct.ts";
import { Product } from "../../api";

function ProductView() {
  const [product, setProduct] = useState<Product>({} as Product);
  const { productId } = useParams();
  const {
    activeProduct,
    clearActiveProduct,
    fetchProductById,
    setActiveProduct,
  } = useStore();

  const { cards, manufacturer, name, year } = product;

  const fullProductName = `${year} ${manufacturer} ${name}`;

  useEffect(() => {
    if (activeProduct.id) {
      setProduct(activeProduct);
    } else if (productId) {
      const fetchedProductByIdFromStore = fetchProductById(productId);

      if (fetchedProductByIdFromStore?.id) {
        setActiveProduct(fetchedProductByIdFromStore);
      }
    } else {
      return () => clearActiveProduct();
    }
  }, [
    activeProduct,
    clearActiveProduct,
    fetchProductById,
    productId,
    setActiveProduct,
    setProduct,
  ]);

  const noProduct = !activeProduct.id;
  const pathId = productId || "";

  const { data, error, isLoading } = useProduct(pathId, noProduct);
  const err = error as Error;

  useEffect(() => {
    if (data?.product.id) {
      setActiveProduct(data.product);
    }
  }, [data, setActiveProduct]);

  return isLoading && noProduct ? (
    <div className="text-sm font-black">Loading...</div>
  ) : error ? (
    <div className="error">{err.message}</div>
  ) : (
    <div className="container h-screen w-full">
      <h1 className="text-4xl font-black">View Product</h1>
      <p className="text-lg">{fullProductName}</p>
      <p className="text-lg">{`with ${cards?.length || 0} cards`}</p>
    </div>
  );
}

export default ProductView;
