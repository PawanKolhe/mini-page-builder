import React, { useRef, useEffect, CSSProperties } from 'react';
import { useElement } from '../../context/elementContext';
import { useReferredState } from '../../utils/utils';

type Props = {
  style?: CSSProperties;
};

const Draggable: React.FC<Props> = ({ children }) => {
  // Element References
  const { boardNode } = useElement();
  const elementRef = useRef<HTMLDivElement | null>(null);

  // State
  const [dragActive, setDragActive] = useReferredState(false);
  const [currentX, setCurrentX] = useReferredState(0);
  const [currentY, setCurrentY] = useReferredState(0);
  const [initialX, setInitialX] = useReferredState(0);
  const [initialY, setInitialY] = useReferredState(0);
  const [xOffset, setXOffset] = useReferredState(0);
  const [yOffset, setYOffset] = useReferredState(0);

  useEffect(() => {
    boardNode.addEventListener('mousedown', dragStart);
    boardNode.addEventListener('mouseup', dragEnd);
    boardNode.addEventListener('mousemove', drag);
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
  };

  const drag = (e: any) => {
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

      setTranslate(currentX.current, currentY.current);
    }
  };

  const setTranslate = (xPos: number, yPos: number) => {
    if (elementRef.current) {
      elementRef.current.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
  };

  return <div ref={elementRef}>{children}</div>;
};

export default Draggable;
