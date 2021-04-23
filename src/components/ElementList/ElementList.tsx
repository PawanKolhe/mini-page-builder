import React, { useState, useEffect } from 'react';
import { DragDropContainer } from 'react-drag-drop-container';
import ElementItem from '../ElementItem/ElementItem';
import { Element } from '../../types/element';
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
  const [dragging, setDragging] = useState(false);
  const [draggingElement, setDraggingElement] = useState<Element | null>(null);

  const handleDragEnd = () => {
    setDraggingElement(null);
    setDragging(false);
  };

  const handleDragStart = (element: Element) => {
    setDraggingElement(element);
    setDragging(true);
  };

  const isElementDragging = (element: Element) => {
    if (dragging && draggingElement?.elementType === element.elementType) {
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
          dragElemOpacity={1}
          dragData={element}
          onDragStart={() => handleDragStart(element)}
          onDragEnd={() => handleDragEnd()}
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
