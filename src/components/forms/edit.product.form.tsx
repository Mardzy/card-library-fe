import * as z from "zod";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEditProduct } from "api/hooks/useEditProduct.ts";
import { SelectInput, TextInput } from "components/inputs";
import { productYears } from "utils/constants.ts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "config/store.ts";

const EditProductSchema = z.object({
  id: z.string().min(3).max(40),
  manufacturer: z.string().min(3).max(40),
  year: z.string().min(4).max(10),
  name: z.string().min(3).max(70),
});
type EditProductType = z.infer<typeof EditProductSchema>;

export const EditProductForm = ({
  id,
  manufacturer,
  name,
  year,
}: EditProductType) => {
  const navigate = useNavigate();
  const { activeProduct, setActiveProduct, updateProduct } = useStore();
  const { error, mutateAsync, isError, isLoading, isSuccess } =
    useEditProduct();

  const methods = useForm<EditProductType>({
    resolver: zodResolver(EditProductSchema),
  });
  const {
    formState: { errors, isSubmitSuccessful },
    handleSubmit,
    setValue,
  } = methods;

  useEffect(() => {
    if (id) setValue("id", id);
  }, [id, setValue]);
  useEffect(() => {
    if (manufacturer) setValue("manufacturer", manufacturer);
  }, [manufacturer, setValue]);
  useEffect(() => {
    if (name) setValue("name", name);
  }, [name, setValue]);
  useEffect(() => {
    if (year) setValue("year", year);
  }, [year, setValue]);

  const handleSuccess: SubmitHandler<EditProductType> = async (formData) => {
    const product = { ...formData, cards: activeProduct.cards };
    setActiveProduct(product);
    await mutateAsync({ ...formData });

    updateProduct(product);
  };

  const handleFailure: SubmitErrorHandler<EditProductType> = (errors) => {
    console.error("Add Product Form Error: ", errors);
    return errors;
  };

  useEffect(() => {
    if (isSuccess) navigate("/admin/products");
  }, [isSuccess, navigate]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(handleSuccess, handleFailure)}>
        <TextInput
          error={errors?.manufacturer}
          label="Manufacturer"
          name="manufacturer"
          placeholder="Add Manufacturer name"
        />
        <SelectInput
          error={errors?.year}
          label="Select a product year"
          name="year"
          options={productYears}
        />
        <TextInput
          error={errors?.name}
          label="Product"
          name="name"
          placeholder="Add Product name"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-10"
          disabled={isLoading}
        >
          Edit Product
        </button>
      </form>
      {isSubmitSuccessful && isSuccess && (
        <div className="mt-20 absolute">Successful update</div>
      )}
      {isError && (
        <p className="absolute text-red-600 text-sm">{`Edit Product request error: ${error}`}</p>
      )}{" "}
    </FormProvider>
  );
};
