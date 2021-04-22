import React, { CSSProperties } from 'react';
import styles from './button.module.scss';

type Props = {
  style?: CSSProperties;
  text: string;
};

const Button: React.FC<Props> = ({ style, text }) => {
  return (
    <button type="button" className={styles.Button} style={style}>
      {text}
    </button>
  );
};

export default Button;
