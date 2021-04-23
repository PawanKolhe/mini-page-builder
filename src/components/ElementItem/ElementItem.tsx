import React from 'react';
import { InlineIcon } from '@iconify/react-with-api';
import styles from './elementItem.module.scss';

type Props = {
  name: string;
  dragging: boolean;
  className?: string;
  isShadowElement?: boolean;
};

const ElementItem: React.FC<Props> = ({ name, dragging = false, className = '', isShadowElement = false }) => {
  const getCustomClassNames = () => {
    if (isShadowElement) {
      return styles.ElementItem__shadow;
    }
    if (dragging) {
      return styles.ElementItem__dragging;
    }
    return '';
  };

  return (
    <div className={`${styles.ElementItem} ${getCustomClassNames()} ${className}`}>
      <div className={styles.ElementItem__icon}>
        <InlineIcon icon="fa-solid:grip-vertical" />
      </div>
      <div className={styles.ElementItem__name}>{name}</div>
    </div>
  );
};

export default ElementItem;
