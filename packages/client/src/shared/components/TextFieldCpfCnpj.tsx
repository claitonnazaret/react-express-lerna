import { FC, useState } from 'react';
import { TextFieldElement, TextFieldElementProps } from 'react-hook-form-mui';
import ReactInputMask from 'react-input-mask';

interface ITextFieldCpfCnpj extends TextFieldElementProps {
  name: string;
  label: string;
}
export const TextFieldCpfCnpj: FC<ITextFieldCpfCnpj> = ({ name, label, ...other }) => {
  const [mask, setMask] = useState('');

  return (
    <TextFieldElement
      label={label}
      name={name}
      {...other}
      InputProps={{
        inputComponent: (props) => (
          <ReactInputMask {...props} type="text" mask={mask} maskChar=" " maskPlaceholder="" />
        ),
      }}
    />
  );
};
