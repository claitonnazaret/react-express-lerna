import React, { FC } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import _ from 'lodash';

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
                <TextField
                    {...otherProps}
                    {...field}
                    error={!!errors[name]}
                    helperText={JSON.stringify(
                        errors[name] ? errors[name]?.message : ''
                    )}
                />
            )}
        />
    );
};

export default FormInput;
