import React from 'react';
import { validateIsEmpty, validateMaxLength, validateMinLength } from '@utils/helpers';
import { useForm, useMutation } from '@utils/hooks';
import { ROUTES } from '@utils/constants';
import { useNavigate } from 'react-router-dom';
import { Input, PasswordInput } from '@ui/fields';
import { Button } from '@ui/button';
import { api } from '@utils/api';


const loginFormValidateSchema = {
  username: (value: string) => {
    const hasErrorisEmpty = validateIsEmpty(value);
    if (hasErrorisEmpty) return hasErrorisEmpty;
    const hasErrorisMinLength = validateMinLength(value, 1);
    return hasErrorisMinLength;
  },
  password: (value: string) => {
    const hasErrorisEmpty = validateIsEmpty(value);
    if (hasErrorisEmpty) return hasErrorisEmpty;
    const hasErrorisMinLength = validateMinLength(value, 1);
    if (hasErrorisMinLength) return hasErrorisMinLength;
    const hasErrorMaxLength = validateMaxLength(value, 15);
    return hasErrorMaxLength;

  }
};

interface LoginFormValues {
  username: string;
  password: string;
}

export const LoginPage = () => {
  const navigate = useNavigate()

  const { mutationAsync: authMutation, isLoading: authLoading } = useMutation(
    (params: any) => api.post('login', params)
  )

  console.log(authLoading)
  const {values, errors, setFieldValue, handleSubmit, setIsSubmiting} = useForm<LoginFormValues>({
    intialValues: { username: '', password: '' },
    validateSchema: loginFormValidateSchema,
    validateOnChange: false,
    onSubmit: async () => {      
      // navigate(ROUTES.HOME);
      const response = await authMutation(values)
      setIsSubmiting(false);
    }
  })

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <form onSubmit={handleSubmit}>
          <Input 
            value={values.username}
            label='username'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const username = event.target.value;
            setFieldValue('username', username);
          }}
          {...(!!errors &&
            !!errors.username && {
              isError: !!errors.username,
              helperText: errors.username
            })}/>
          <PasswordInput
            value={values.password}
            label='password'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const password = event.target.value;
              setFieldValue('password', password);
            }}
            {...(!!errors &&
              !!errors.password && {
                isError: !!errors.password,
                helperText: errors.password
              })}
          />
          <Button type='submit'>login</Button>
        </form>
      </div>
    </>
  );
};