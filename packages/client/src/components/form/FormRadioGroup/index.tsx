import { RadioGroupProps, FormControlProps } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext, RadioButtonGroup } from 'react-hook-form-mui';

type IFormRadioGroup = {
    label: string;
    name: string;
    type: 'number' | 'string';
    options: any[];
} & RadioGroupProps &
    FormControlProps;

const FormInput: FC<IFormRadioGroup> = ({ name, type, options, ...otherProps }) => {
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
                        type={type}
                        {...otherProps}
                        {...field}
                        parseError={(error) => (error ? String(errors[name]?.message) : '')}
                        options={options}
                    />
                )}
            />
        </>
    );
};

export default FormInput;
