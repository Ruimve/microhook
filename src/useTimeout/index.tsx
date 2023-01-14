/**
 * @author jingyu
 * @description 返回一个在整个生命周期持续存在的定时器
 */
import { useRef, useCallback } from 'react';

function useTimeout(callback: () => void, delay: number = 0): [() => void, () => void] {
  const ref = useRef<NodeJS.Timeout | null>(null);

  const on = useCallback(() => {
    ref.current = setTimeout(callback, delay);
  }, [ref]);

  const off = useCallback(() => {
    ref.current && clearTimeout(ref.current);
    ref.current = null;
  }, [ref]);

  return [on, off];
}

export {
  useTimeout
}

