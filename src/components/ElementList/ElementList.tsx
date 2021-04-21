import React, { useState, useEffect } from 'react';
import ElementItem from '../ElementItem/ElementItem';
import { Element, useElement } from '../../context/elementContext';
import styles from './elementList.module.scss';

type Props = {
  elements: Element[];
};

const ElementList: React.FC<Props> = ({ elements }) => {
  const { dragItem, setDragItem, dragNode, setDragNode } = useElement();
  const [dragging, setDragging] = useState(false);

  const handleDragEnd = (e: any) => {
    setDragging(false);
    dragNode?.removeEventListener('dragend', handleDragEnd);
    setDragNode(null);
    setDragItem(null);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, element: Element) => {
    setDragItem(element);
    setDragNode(e.target as HTMLElement);
    setImmediate(() => {
      setDragging(true);
    });
  };

  useEffect(() => {
    dragNode?.addEventListener('dragend', handleDragEnd);
  }, [dragNode]);

  const isElementDragging = (element: Element) => {
    const currentItem = dragItem;
    if (dragging && currentItem?.name === element.name) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.ElementList}>
      {elements.map((element) => (
        <ElementItem
          dragging={isElementDragging(element)}
          key={element.name}
          name={element.name}
          onDragStart={(e) => handleDragStart(e, element)}
        />
      ))}
    </div>
  );
};

export default ElementList;
