import React from 'react';

export type Element = {
  name: string;
  JSX: React.FC;
};

export type ElementContextType = {
  dragItem: Element | null;
  setDragItem: (element: Element) => void;
  dragNode: HTMLElement | null;
  setDragNode: (node: HTMLElement) => void;
  boardNode: HTMLElement | null;
  setBoardNode: (node: HTMLElement) => void;
};

export const ElementContext = React.createContext<ElementContextType | null>(null);

export function useElement(): any {
  const context = React.useContext(ElementContext);
  if (!context) {
    throw new Error(`useElement must be used within an ElementProvider`);
  }
  return context;
}

const ElementProvider: React.FC = ({ children }) => {
  const [dragItem, setDragItem] = React.useState<Element | null>(null);
  const [dragNode, setDragNode] = React.useState<HTMLElement | null>(null);
  const [boardNode, setBoardNode] = React.useState<HTMLElement | null>(null);
  return (
    <ElementContext.Provider value={{ dragItem, setDragItem, dragNode, setDragNode, boardNode, setBoardNode }}>
      {children}
    </ElementContext.Provider>
  );
};

export default ElementProvider;
