import { Input, TextField, TextFieldProps, InputLabel } from '@mui/material';
import { InputProps } from '@mui/material/Input';
import { FC, forwardRef, ChangeEvent, useRef, useState } from 'react';
import { Controller, useFormContext, TextFieldElement } from 'react-hook-form-mui';
import { IMaskInput } from 'react-imask';

type IFormInputProps = {
  name: string;
  label: string;
  mask: string;
} & TextFieldProps;

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  mask: string;
}

const TextMaskCustom = (props: any, mask: string) => {
  const { inputRef, ...other } = props;

  const ref = useRef(inputRef);

  return (
    <IMaskInput
      {...other}
      ref={ref}
      mask="mask"
      definitions={{
        '#': /[1-9]/,
      }}
      placeholderChar={'\u2000'}
      guide
      keepCharPositions
    />
  );
};

export const FormMaskInput: FC<IFormInputProps> = ({
  label,
  name,
  mask,
  ...otherProps
}: IFormInputProps) => {
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
          label={label}
          size="small"
          parseError={(error) => (error ? String(errors[name]?.message) : '')}
          InputProps={{
            inputComponent: (props: any) => {
              const { inputRef, onChange, ...other } = props;
              const ref = useRef(inputRef);
              return (
                <IMaskInput
                  {...other}
                  ref={ref}
                  mask={mask}
                  definitions={{
                    '#': /[0-9]/,
                  }}
                />
              );
            },
          }}
        />
      )}
    />
  );
};
