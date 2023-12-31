import {
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CSVFileInput, SelectInput, TextInput } from "components/inputs";

import { AddProductSchema, AddProductType, useAddProduct } from "api/hooks";
import { useStore } from "config/store.ts";
import { productYears } from "utils";

export const AddProductForm = () => {
  const { clearProducts } = useStore();
  const { mutate, isLoading, isSuccess, isError, error } = useAddProduct();
  const methods = useForm<AddProductType>({
    resolver: zodResolver(AddProductSchema),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = methods;

  const handleSuccess: SubmitHandler<AddProductType> = (formData) => {
    mutate({ ...formData });

    if (isSuccess) {
      reset();
      clearProducts();
    }
  };

  const handleFailure: SubmitErrorHandler<AddProductType> = (errors) => {
    console.error("Add Product Form Error: ", errors);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(handleSuccess, handleFailure)}
        className="relative"
      >
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
        <CSVFileInput
          error={errors?.fileData}
          name="fileData"
          fileTypes=".csv"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-10"
          disabled={isLoading}
        >
          Add Product
        </button>
        {isSubmitSuccessful && isSuccess && (
          <div className="mt-20 absolute">
            Successful submission, add another product
          </div>
        )}
        {isError && (
          <p className="absolute text-red-600 text-sm">{`Add Product request error: ${error}`}</p>
        )}
      </form>
    </FormProvider>
  );
};
