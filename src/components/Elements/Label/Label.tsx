import React, { CSSProperties } from 'react';
import styles from './label.module.scss';

type Props = {
  style?: CSSProperties;
  text: string;
};

const Label: React.FC<Props> = ({ style, text }) => {
  return (
    <label className={styles.Label} style={style}>
      {text}
    </label>
  );
};

export default Label;
