import React, { useRef, useEffect, MouseEvent, KeyboardEvent } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Element, ElementConfig, useApp } from '../../context/appContext';
import styles from './elementWrapper.module.scss';

type Props = {
  element: Element;
  deleteBoardElement: (elementID: string) => void;
  updateBoardElement: (elementID: string, elementConfig: ElementConfig) => void;
  setSelectedElement: (element: Element | null) => void;
  selectedElement: Element | null;
};

const ElementWrapper: React.FC<Props> = ({
  children,
  element,
  deleteBoardElement,
  updateBoardElement,
  setSelectedElement,
  selectedElement,
}) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return () => {
      setSelectedElement(null);
    };
  }, []);

  const onDragStop = (e: DraggableEvent, data: DraggableData) => {
    updateBoardElement(element.id, {
      ...element.config,
      x: data.x.toString(),
      y: data.y.toString(),
    });
    setSelectedElement({ ...element });
  };

  const onDrag = (e: DraggableEvent, data: DraggableData) => {
    updateBoardElement(element.id, {
      ...element.config,
      x: data.x.toString(),
      y: data.y.toString(),
    });
  };

  const handleOnMouseDown = (e: DraggableEvent) => {
    setSelectedElement(element);
  };

  const isSelected = () => selectedElement?.id === element.id;

  return (
    <Draggable
      nodeRef={elementRef}
      bounds="parent"
      position={{ x: parseInt(element.config.x, 10), y: parseInt(element.config.y, 10) }}
      onDrag={onDrag}
      onStop={onDragStop}
      onMouseDown={handleOnMouseDown}
    >
      <div
        ref={elementRef}
        className={`${styles.ElementWrapper} ${isSelected() ? styles.ElementWrapper__active : ''}`}
        role="button"
        tabIndex={0}
      >
        {children}
      </div>
    </Draggable>
  );
};

export default ElementWrapper;
