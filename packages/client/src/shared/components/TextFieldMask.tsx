import { FC } from 'react';
import { TextFieldElement, TextFieldElementProps } from 'react-hook-form-mui';
import { mask, unMask } from 'ts-remask';

interface ITextFieldMask extends TextFieldElementProps {
  name: string;
  label: string;
  masks: string | string[];
  setValue: any;
}
export const TextFieldMask: FC<ITextFieldMask> = ({ name, label, masks, setValue, ...other }) => {
  const handleChange = (ev: any) => {
    const val = mask(unMask(ev.target.value), masks);
    setValue(name, val);
  };

  return <TextFieldElement label={label} name={name} {...other} onChange={handleChange} />;
};
