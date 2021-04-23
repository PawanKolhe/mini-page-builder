import React, { CSSProperties } from 'react';
import styles from './input.module.scss';

type Props = {
  text: string;
  style?: CSSProperties;
  className?: string;
};

const Input: React.FC<Props> = ({ text, style, className, ...props }) => {
  return (
    <input type="text" value={text} className={`${styles.Input} ${className}`} style={style} readOnly {...props} />
  );
};

export default Input;
