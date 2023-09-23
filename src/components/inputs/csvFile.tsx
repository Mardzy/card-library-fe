import { useEffect } from "react";
import { FieldError, useFormContext } from "react-hook-form";

import { LabelInput } from "components/inputs";

type FileInputType = {
  error?: FieldError | undefined;
  name: string;
  fileTypes: string;
};

/**
 *
 * @param error
 * @param name
 * @param fileTypes
 * @constructor
 */
export const CSVFileInput = ({
  error,

  name,
  fileTypes,
}: FileInputType) => {
  const { register, setValue, unregister } = useFormContext();

  useEffect(() => {
    register(name);

    return () => {
      unregister(name);
    };
  }, [name, register, unregister]);

  return (
    <LabelInput error={error?.message} label="Select File" htmlFor={name}>
      <input
        accept={fileTypes}
        className="block w-full p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id={name}
        type="file"
        onChange={({ target }) => {
          if (target && target.files && target.files.length) {
            const file = target && target.files ? target.files[0] : undefined;

            const reader = new FileReader();
            reader.onload = async ({ target }) => {
              if (target && target.result) setValue(name, target.result);
            };

            if (file) reader.readAsText(file);
          }
        }}
      />
    </LabelInput>
  );
};

/*
<LabelInput error={error?.message} label={label} htmlFor={name}>
    <Controller
        control={control}
        name={name}
        render={({ field }) => {
            return (
                <input
                    {...field}
                    className="hidden"
                    id={name}
                    type="file"
                    accept={fileTypes}
                />
            );
        }}
    />
</LabelInput>*/
