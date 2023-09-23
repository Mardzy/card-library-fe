import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { LabelInput } from 'components/inputs';

type SelectInputType = {
    error?: FieldError | undefined;
    label: string;
    name: string;
    options: string[] | number[];
};

/**
 *
 * @param error
 * @param label
 * @param name
 * @param options
 * @constructor
 */
export const SelectInput = ({
    error,
    label,
    name,
    options
}: SelectInputType) => {
    const { register } = useFormContext();

    return (
        <LabelInput error={error?.message} label={label} htmlFor={name}>
            <select
                id={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                size={1}
                {...register(name)}
            >
                {options.map((item) => (
                    <option
                        className="text-sm font-medium w-full"
                        key={item}
                        value={item}
                    >
                        {item}
                    </option>
                ))}
            </select>
            {error && <p>{error.message}</p>}
        </LabelInput>
    );
};
