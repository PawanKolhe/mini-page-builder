import React, { useRef, useEffect, CSSProperties, MouseEvent, KeyboardEvent } from 'react';
import { Element, ElementConfig, useApp } from '../../context/appContext';
import { useReferredState } from '../../utils/utils';
import styles from './draggable.module.scss';

type Props = {
  element: Element;
  deleteBoardElement: (elementID: string) => void;
  updateBoardElement: (elementID: string, elementConfig: ElementConfig) => void;
  openModal: () => void;
};

const Draggable: React.FC<Props> = ({ children, element, deleteBoardElement, updateBoardElement, openModal }) => {
  // Element References
  const {
    boardNode,
    selectedBoardElementNode,
    selectedBoardElementItem,
    setSelectedBoardElementItem,
    setSelectedBoardElementNode,
  } = useApp();
  const elementRef = useRef<HTMLDivElement | null>(null);

  // State
  const [dragActive, setDragActive] = useReferredState(false);
  const [currentX, setCurrentX] = useReferredState(parseInt(element.config.x, 10));
  const [currentY, setCurrentY] = useReferredState(parseInt(element.config.y, 10));
  const [initialX, setInitialX] = useReferredState(0);
  const [initialY, setInitialY] = useReferredState(0);
  const [xOffset, setXOffset] = useReferredState(parseInt(element.config.x, 10));
  const [yOffset, setYOffset] = useReferredState(parseInt(element.config.y, 10));

  useEffect(() => {
    boardNode.addEventListener('mousedown', dragStart);
    boardNode.addEventListener('mouseup', dragEnd);
    boardNode.addEventListener('mousemove', drag);

    return () => {
      setSelectedBoardElementItem(null);
      setSelectedBoardElementNode(null);
      boardNode.removeEventListener('mousedown', dragStart);
      boardNode.removeEventListener('mouseup', dragEnd);
      boardNode.removeEventListener('mousemove', drag);
    };
  }, []);

  const dragStart = (e: any) => {
    if (e.type === 'touchstart') {
      setInitialX(e.touches[0].clientX - xOffset.current);
      setInitialY(e.touches[0].clientY - yOffset.current);
    } else {
      setInitialX(e.clientX - xOffset.current);
      setInitialY(e.clientY - yOffset.current);
    }

    if (e.target === elementRef.current) {
      setDragActive(true);
    }
  };

  const dragEnd = (e: any) => {
    setInitialX(currentX.current);
    setInitialY(currentY.current);
    setDragActive(false);
    // updateBoardElement(element.id, {
    //   ...element.config,
    //   x: currentX.current.toString(),
    //   y: currentY.current.toString(),
    // });
  };

  const drag = (e: any) => {
    e.stopPropagation();
    if (dragActive.current) {
      e.preventDefault();

      if (e.type === 'touchmove') {
        setCurrentX(e.touches[0].clientX - initialX.current);
        setCurrentY(e.touches[0].clientY - initialY.current);
      } else {
        setCurrentX(e.clientX - initialX.current);
        setCurrentY(e.clientY - initialY.current);
      }

      setXOffset(currentX.current);
      setYOffset(currentY.current);

      console.log(
        `Current: ${currentX.current}, ${currentY.current}`,
        `Initial: ${initialX.current}, ${initialY.current}`,
        `Offset: ${xOffset.current}, ${yOffset.current}`,
      );
      // setTranslate(currentX.current, currentY.current);
      setPosition(xOffset.current, yOffset.current);
    }
  };

  // const setTranslate = (xPos: number, yPos: number) => {
  //   if (elementRef.current) {
  //     elementRef.current.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  //   }
  // };

  const setPosition = (xPos: number, yPos: number) => {
    if (elementRef.current) {
      elementRef.current.style.left = `${xPos}px`;
      elementRef.current.style.top = `${yPos}px`;
    }
  };

  const handleOnMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    elementRef.current?.focus();
    setSelectedBoardElementItem(element);
    setSelectedBoardElementNode(elementRef.current);
  };

  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      openModal();
    } else if (e.key === 'Delete') {
      deleteBoardElement(element.id);
    }
  };

  const isSelected = () => selectedBoardElementNode === elementRef.current;

  return (
    <div
      ref={elementRef}
      className={`${styles.Draggable} ${isSelected() ? styles.Draggable__active : ''}`}
      style={{
        left: `${element.config.x}px`,
        top: `${element.config.y}px`,
        fontSize: `${element.config.fontSize}px`,
        fontWeight: parseInt(`${element.config.fontWeight}`, 10) || 400,
      }}
      onMouseDown={handleOnMouseDown}
      onKeyDown={handleOnKeyDown}
      role="button"
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export default Draggable;
