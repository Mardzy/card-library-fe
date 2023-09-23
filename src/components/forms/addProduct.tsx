import {
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
  useForm,
} from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { CSVFileInput, SelectInput, TextInput } from "components/inputs";
import { addProductService } from "services";
import { getProductYearRange } from "utils/functions";

const AddProductSchema = z.object({
  manufacturer: z.string().min(3).max(40),
  year: z.string().min(4).max(10),
  name: z.string().min(3).max(70),
  fileData: z.string().min(3).max(999999999),
});

export type AddProductType = z.infer<typeof AddProductSchema>;

export const AddProductForm = () => {
  const productYears = getProductYearRange(2019, 2023, 1);
  const addProduct = useMutation({ mutationFn: addProductService });
  const methods = useForm<AddProductType>({
    resolver: zodResolver(AddProductSchema),
  });
  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty },
    reset,
  } = methods;

  const handleSuccess: SubmitHandler<AddProductType> = (formData) => {
    reset();

    return addProduct.mutate({ ...formData });
  };
  const handleFailure: SubmitErrorHandler<AddProductType> = (errors) => {
    console.log("Add Product Form Error: ", errors);
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
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-10">
          Add Product
        </button>
        {isSubmitSuccessful && !isDirty && (
          <div className="mt-20 absolute">
            Successful submission, add another product
          </div>
        )}
      </form>
    </FormProvider>
  );
};
