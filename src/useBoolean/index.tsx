import { useCallback } from "react";
import { useToggle } from '../useToggle';
import { ReturnValue } from '../define';

interface Action {
  toggle: (value?: boolean) => void;
}

function useBoolean(initialValue: boolean = false): ReturnValue<boolean, Action> {
  const [boolean, { toggle: defaultToggle, setLeft, setRight }] = useToggle(initialValue, !initialValue);
  const toggle = useCallback((value?: boolean) => {
    if (boolean === value) return;
    if (typeof value === 'boolean') {
      value === initialValue ? setLeft() : setRight();
    } else {
      defaultToggle();
    }
  }, [boolean, initialValue]);

  return [boolean, { toggle }];
}

export {
  useBoolean
}