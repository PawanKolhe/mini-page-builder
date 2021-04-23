import React, { useState, useEffect } from 'react';
import { DragDropContainer } from 'react-drag-drop-container';
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
    console.log('gg', e);
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
        <DragDropContainer
          targetKey="elements"
          key={element.elementType}
          dragData={element}
          onDragStart={(e: any) => handleDragStart(e, element)}
          onDragEnd={handleDragEnd}
          customDragElement={
            <div className={styles.ElementList__shadowElement}>
              <ElementItem
                dragging={isElementDragging(element)}
                name={element.elementType}
                className={styles.ElementList__shadowElementInner}
                isShadowElement
              />
            </div>
          }
        >
          <ElementItem dragging={isElementDragging(element)} name={element.elementType} />
        </DragDropContainer>
      ))}
    </div>
  );
};

export default ElementList;
