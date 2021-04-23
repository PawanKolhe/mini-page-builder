import React from 'react';
import styles from './formInput.module.scss';

type Props = {
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  id: string;
  label?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
};

const FormInput: React.FC<Props> = ({
  value,
  onChange,
  type = 'text',
  placeholder = '',
  id,
  label,
  min,
  max,
  step,
}) => {
  return (
    <div className={styles.FormInput}>
      {label && (
        <label className={styles.FormInput__label} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={styles.FormInput__input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        id={id}
        step={step}
        min={min}
        max={max}
      />
    </div>
  );
};

export default FormInput;
