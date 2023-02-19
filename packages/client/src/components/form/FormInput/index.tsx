import { TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext, TextFieldElement } from 'react-hook-form-mui';

type IFormInputProps = {
    name: string;
} & TextFieldProps;

const FormInput: FC<IFormInputProps> = ({ name, ...otherProps }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={control}
            name={name}
            defaultValue=""
            render={({ field }) => (
                <TextFieldElement
                    {...otherProps}
                    {...field}
                    parseError={(error) => (error ? String(errors[name]?.message) : '')}
                />
            )}
        />
    );
};

export default FormInput;
