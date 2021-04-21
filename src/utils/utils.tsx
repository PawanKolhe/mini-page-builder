import { useRef, useState } from 'react';

const useReferredState = <T,>(initialValue: T): [React.MutableRefObject<T>, React.Dispatch<T>] => {
  const [state, setState] = useState<T>(initialValue);
  const reference = useRef<T>(state);

  const setReferredState = (value: T) => {
    reference.current = value;
    setState(value);
  };

  return [reference, setReferredState];
};

// eslint-disable-next-line import/prefer-default-export
export { useReferredState };
