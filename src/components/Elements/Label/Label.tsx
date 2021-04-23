import React, { CSSProperties } from 'react';
import styles from './label.module.scss';

type Props = {
  text: string;
  style?: CSSProperties;
  className?: string;
};

const Label: React.FC<Props> = ({ text, style, className, ...props }) => {
  return (
    <label className={`${styles.Label} ${className}`} style={style} {...props}>
      {text}
    </label>
  );
};

export default Label;
