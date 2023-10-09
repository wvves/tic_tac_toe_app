import React from 'react';
import styles from '../input.module.css'
export interface FieldProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  loading?: boolean;
  isError?: boolean;
  helperText?: string;
  availableChars?: RegExp;
}

export const Input: React.FC<FieldProps> = ({
  isError = false,
  helperText,
  onChange,
  label,
  availableChars,
  ...props
}) => {

  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <>
    <div className={styles.field_container}>
      <label htmlFor={props.id} className={styles.input_label}>{label}</label>
      <div className={styles.input_container}>
        <input
          ref={inputRef}
          className={styles.input}
          onChange={(e) => {
            if (!!onChange && !e.target.value) return onChange(e);
            if (!onChange || (availableChars && !availableChars.test(e.target.value)))
              // @ts-ignore
              return onChange({ ...e, target: { ...e.target, value: props.value } });
            onChange(e);
          }}
          {...props}
        />
      </div>
    </div>
    {isError && helperText && <div className={styles.helper_text}>{helperText}</div>}
    </>
  );
};