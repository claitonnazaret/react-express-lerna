import { RadioGroupProps, FormControlProps } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext, RadioButtonGroup } from 'react-hook-form-mui';

type IFormRadioGroup = {
    name: string;
    options: any[];
    type: 'number' | 'string';
    label?: string;
} & RadioGroupProps &
    FormControlProps;

export const FormRadioGroup: FC<IFormRadioGroup> = ({
    name,
    options,
    type = 'string',
    label = '',
    ...others
}: IFormRadioGroup) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <>
            <Controller
                control={control}
                name={name}
                defaultValue=""
                render={({ field }) => (
                    <RadioButtonGroup
                        label={label}
                        type={type}
                        {...field}
                        {...others}
                        parseError={(error) => (error ? String(errors[name]?.message) : '')}
                        options={options}
                    />
                )}
            />
        </>
    );
};
