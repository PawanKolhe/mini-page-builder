import React, { CSSProperties } from 'react';
import styles from './button.module.scss';

type Props = {
  style?: CSSProperties;
};

const Button: React.FC<Props> = ({ style }) => {
  return (
    <button type="button" className={styles.Button} style={style}>
      Button
    </button>
  );
};

export default Button;
