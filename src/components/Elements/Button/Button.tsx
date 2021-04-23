import React, { CSSProperties } from 'react';
import styles from './button.module.scss';

type Props = {
  text: string;
  style?: CSSProperties;
  className?: string;
};

const Button: React.FC<Props> = ({ text, style, className, ...props }) => {
  return (
    <button type="button" className={`${styles.Button} ${className}`} style={style} {...props}>
      {text}
    </button>
  );
};

export default Button;
