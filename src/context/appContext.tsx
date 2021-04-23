import React from 'react';

export type ElementConfig = {
  text: string;
  x: string;
  y: string;
  fontSize: string;
  fontWeight: string;
};

export type Element = {
  id: string;
  elementType: string;
  config: ElementConfig;
};

export type AppContextType = {
  sidebarDragItem: Element | null;
  setSidebarDragItem: (element: Element) => void;
  sidebarDragNode: HTMLElement | null;
  setSidebarDragNode: (node: HTMLElement) => void;
  boardNode: HTMLElement | null;
  setBoardNode: (node: HTMLElement) => void;
};

export const AppContext = React.createContext<AppContextType | null>(null);

export function useApp(): any {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error(`useElement must be used within an ElementProvider`);
  }
  return context;
}

const AppProvider: React.FC = ({ children }) => {
  const [sidebarDragItem, setSidebarDragItem] = React.useState<Element | null>(null);
  const [sidebarDragNode, setSidebarDragNode] = React.useState<HTMLElement | null>(null);
  const [boardNode, setBoardNode] = React.useState<HTMLElement | null>(null);
  return (
    <AppContext.Provider
      value={{
        sidebarDragItem,
        setSidebarDragItem,
        sidebarDragNode,
        setSidebarDragNode,
        boardNode,
        setBoardNode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
