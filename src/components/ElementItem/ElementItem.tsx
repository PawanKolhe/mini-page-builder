import React from 'react';
import { InlineIcon } from '@iconify/react-with-api';
import styles from './elementItem.module.scss';

type Props = {
  name: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  dragging: boolean;
};

const ElementItem: React.FC<Props> = ({ name, onDragStart, dragging = false }) => {
  return (
    <div
      className={`${styles.ElementItem} ${dragging ? styles.ElementItem__dragging : ''}`}
      draggable
      onDragStart={onDragStart}
    >
      <div className={styles.ElementItem__icon}>
        <InlineIcon icon="fa-solid:grip-vertical" />
      </div>
      <div className={styles.ElementItem__name}>{name}</div>
    </div>
  );
};

export default ElementItem;
