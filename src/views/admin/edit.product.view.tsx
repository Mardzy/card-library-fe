import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useStore } from "config/store.ts";
import { useProduct, Product } from "api/hooks";
import { EditProductForm } from "components/forms/edit.product.form.tsx";

function EditProductView() {
  const [product, setProduct] = useState<Product>({} as Product);
  const { productId } = useParams();
  const {
    activeProduct,
    clearActiveProduct,
    fetchProductById,
    setActiveProduct,
  } = useStore();

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
      <h1 className="text-4xl font-black">Edit Product</h1>
      <EditProductForm {...product} />
    </div>
  );
}

export default EditProductView;
