import React, { useState, useRef, useEffect, MouseEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Element, ElementConfig, useApp } from '../../context/appContext';
import Draggable from '../Draggable/Draggable';
import { Label, Input, Button } from '../Elements';
import Modal from '../Modal/Modal';
import styles from './board.module.scss';

const Board: React.FC = () => {
  const {
    sidebarDragItem,
    boardNode,
    setBoardNode,
    setSelectedBoardElementItem,
    setSelectedBoardElementNode,
  } = useApp();
  const [boardElements, setBoardElements] = useState<Element[]>([]);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setBoardNode(boardRef.current);
  }, []);

  const handleOnDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleOnDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    if (sidebarDragItem) {
      setBoardElements([
        ...boardElements,
        {
          id: uuidv4(),
          elementType: sidebarDragItem.elementType,
          config: {
            text: sidebarDragItem.elementType,
            x: e.pageX.toString(),
            y: e.pageY.toString(),
            fontSize: '',
            fontWeight: '',
          },
        },
      ]);
    }
  };

  const handleBoardOnClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === boardNode) {
      setSelectedBoardElementItem(null);
      setSelectedBoardElementNode(null);
    }
  };

  const deleteBoardElement = (elementID: string) => {
    setBoardElements(boardElements.filter((element) => element.id !== elementID));
  };

  const updateBoardElement = (elementID: string, elementConfig: ElementConfig) => {
    setBoardElements(
      boardElements.map((element) => {
        if (element.id === elementID) {
          return { ...element, config: { ...elementConfig } };
        }
        return element;
      }),
    );
    setModalOpen(false);
  };

  const getElementJSX = (element: Element) => {
    switch (element.elementType) {
      case 'Label':
        return <Label text={element.config.text} />;
      case 'Input':
        return <Input value={element.config.text} />;
      case 'Button':
        return <Button text={element.config.text} />;
      default:
        return null;
    }
  };

  return (
    <>
      <div
        ref={boardRef}
        className={styles.Board}
        onDragOver={handleOnDragOver}
        onDrop={handleOnDrop}
        onClick={handleBoardOnClick}
        role="none"
      >
        {boardElements.map((element) => {
          return (
            <Draggable
              key={element.id}
              element={element}
              deleteBoardElement={deleteBoardElement}
              updateBoardElement={updateBoardElement}
              openModal={() => setModalOpen(true)}
            >
              {getElementJSX(element)}
            </Draggable>
          );
        })}
      </div>
      <Modal open={modalOpen} closeModal={() => setModalOpen(false)} updateBoardElement={updateBoardElement} />
    </>
  );
};

export default Board;
