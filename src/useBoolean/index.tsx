import { useCallback } from "react";
import { useToggle } from '../useToggle';

function useBoolean(initialValue: boolean = false): [boolean, (value?: boolean) => void] {
  const [boolean, { toggle, setLeft, setRight }] = useToggle(initialValue, !initialValue);
  const toggleBool = useCallback((value?: boolean) => {
    if (boolean === value) return;
    if (typeof value === 'boolean') {
      value === initialValue ? setLeft() : setRight();
    } else {
      toggle();
    }
  }, [boolean, initialValue]);

  return [boolean, toggleBool];
}

export {
  useBoolean
}