import React from 'react';

type LabelInputType = {
    children: React.ReactNode;
    error?: string | undefined;
    label: string;
    htmlFor: string;
};

export const LabelInput = ({
    children,
    error,
    label,
    htmlFor
}: LabelInputType) => (
    <div className="mb-5 w-full relative">
        <label
            htmlFor={htmlFor}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            {label}
        </label>
        {children}
        {error && <p className="absolute text-red-600 text-sm">{error}</p>}
    </div>
);
