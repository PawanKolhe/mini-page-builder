import React, { useState, useEffect } from 'react';
import ElementItem from '../ElementItem/ElementItem';
import { Element, useApp } from '../../context/appContext';
import styles from './elementList.module.scss';

const initialConfig = {
  text: '',
  x: '',
  y: '',
  fontSize: '',
  fontWeight: '',
};

const elements: Element[] = [
  {
    id: '',
    elementType: 'Label',
    config: { ...initialConfig },
  },
  {
    id: '',
    elementType: 'Input',
    config: { ...initialConfig },
  },
  {
    id: '',
    elementType: 'Button',
    config: { ...initialConfig },
  },
];

const ElementList: React.FC = () => {
  const { sidebarDragItem, setSidebarDragItem, sidebarDragNode, setSidebarDragNode } = useApp();
  const [dragging, setDragging] = useState(false);

  const handleDragEnd = (e: any) => {
    setDragging(false);
    sidebarDragNode?.removeEventListener('dragend', handleDragEnd);
    setSidebarDragNode(null);
    setSidebarDragItem(null);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, element: Element) => {
    setSidebarDragItem(element);
    setSidebarDragNode(e.target as HTMLElement);
    setImmediate(() => {
      setDragging(true);
    });
  };

  useEffect(() => {
    sidebarDragNode?.addEventListener('dragend', handleDragEnd);
  }, [sidebarDragNode]);

  const isElementDragging = (element: Element) => {
    const currentItem = sidebarDragItem;
    if (dragging && currentItem?.elementType === element.elementType) {
      return true;
    }
    return false;
  };

  return (
    <div className={styles.ElementList}>
      {elements.map((element) => (
        <ElementItem
          dragging={isElementDragging(element)}
          key={element.elementType}
          name={element.elementType}
          onDragStart={(e) => handleDragStart(e, element)}
        />
      ))}
    </div>
  );
};

export default ElementList;
