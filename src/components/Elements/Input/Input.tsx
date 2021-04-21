import React, { CSSProperties } from 'react';
import styles from './input.module.scss';

type Props = {
  style?: CSSProperties;
};

const Input: React.FC<Props> = ({ style }) => {
  return <input type="text" className={styles.Input} style={style} />;
};

export default Input;
