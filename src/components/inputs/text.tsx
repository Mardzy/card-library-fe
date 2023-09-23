import React from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

import { LabelInput } from 'components/inputs';

type TextInputType = {
    error?: FieldError | undefined;
    label: string;
    name: string;
    placeholder?: string;
};

/**
 *
 * @param error
 * @param label
 * @param name
 * @param placeholder
 * @constructor
 */
export const TextInput = ({
    error,
    label,
    name,
    placeholder
}: TextInputType) => {
    const { register } = useFormContext();

    return (
        <LabelInput error={error?.message} label={label} htmlFor={name}>
            <input
                type="text"
                id={name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                {...register(name)}
            />
        </LabelInput>
    );
};
