import React from 'react';

import type { FieldProps } from '../input/Input';
import { Input } from '../input/Input';

type PasswordInputProps = FieldProps;
export const PasswordInput: React.FC<PasswordInputProps> = ({ value, disabled, ...props }) => {

  return (
    <Input
      type={'password'}
      availableChars={/^[a-zA-Z0-9!;,.]+$/g}
      value={value}
      disabled={disabled}
      {...props}
    />
  );
};