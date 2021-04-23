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
