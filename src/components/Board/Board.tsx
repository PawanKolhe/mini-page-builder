import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ElementContextType, useElement } from '../../context/elementContext';
import styles from './board.module.scss';

const Board: React.FC = () => {
  const { dragItem, setBoardNode } = useElement();
  const [boardElements, setBoardElements] = useState<JSX.Element[]>([]);
  const boardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setBoardNode(boardRef.current);
  }, []);

  const handleOnDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  const handleOnDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    if (dragItem) {
      setBoardElements([
        ...boardElements,
        <dragItem.JSX
          key={uuidv4()}
          style={{
            left: `${e.pageX}px`,
            top: `${e.pageY}px`,
          }}
        />,
      ]);
    }
  };

  return (
    <div ref={boardRef} className={styles.Board} onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
      {boardElements.map((element) => {
        return element;
      })}
    </div>
  );
};

export default Board;
