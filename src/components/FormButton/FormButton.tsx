import React, { CSSProperties } from 'react';
import styles from './formButton.module.scss';

type Props = {
  style?: CSSProperties;
  text: string;
};

const FormButton: React.FC<Props> = ({ style, text }) => {
  return (
    <button type="submit" className={styles.FormButton} style={style}>
      {text}
    </button>
  );
};

export default FormButton;
