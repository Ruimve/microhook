import { useState, useCallback } from 'react';
import * as _ from 'lodash';

interface Utils {
  setLeft(): void;
  setRight(): void;
  toggle(): void;
}

function useToggle<T, P>(left: T, right: P): [T | P, Utils] {
  const [value, setValue] = useState<T | P>(left);

  const setLeft = useCallback(() => {
    !_.isEqual(value, left) && setValue(left);
  }, [value, left]);

  const setRight = useCallback(() => {
    !_.isEqual(value, right) && setValue(right);
  }, [value, right]);

  const toggle = useCallback(() => {
    setValue(_.isEqual(value, left) ? right : left);
  }, [value, left, right]);

  return [value, { setLeft, setRight, toggle }];
}

export {
  useToggle
}
