import { TextFieldProps } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext, TextFieldElement } from 'react-hook-form-mui';

type IFormInputProps = {
    name: string;
} & TextFieldProps;

export const FormInput: FC<IFormInputProps> = ({ name, ...otherProps }: IFormInputProps) => {
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
                    size="small"
                    parseError={(error) => (error ? String(errors[name]?.message) : '')}
                />
            )}
        />
    );
};
