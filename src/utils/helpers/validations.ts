export type ValidationReturn = string | null;

export const validateMaxLength = (
  value: string,
  maxLength: number,
  message: string = 'validate.maxLength'
): ValidationReturn  => {
  if(maxLength <= value.length) return message;
  return null;
};

export const validateIsEmpty = (
  value: string,
  message: string = 'validations.required'
): ValidationReturn => {
  if (!value) return message;
  return null;
};

export const validateMinLength = (
  value: string,
  minLength: number,
  message: string = 'validations.minLength'
): ValidationReturn => {
  if (minLength >= value.length) return message;
  return null;
};