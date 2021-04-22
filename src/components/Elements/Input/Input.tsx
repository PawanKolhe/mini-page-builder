import React, { CSSProperties } from 'react';
import styles from './input.module.scss';

type Props = {
  style?: CSSProperties;
  value: string;
};

const Input: React.FC<Props> = ({ style, value }) => {
  return <input type="text" value={value} className={styles.Input} style={style} readOnly />;
};

export default Input;
