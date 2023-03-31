import { useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { ReturnValue } from '../define';

interface Action {
  render: () => React.ReactPortal
}

/**
 * @param callback Make sure to using with useCallback and React.memo, see `demo` for details.
 * @param container html element, like `document.body`.
 * @returns Render function: () => JSX.Element
 */
function usePortal(callback: () => React.ReactNode, container: HTMLElement): ReturnValue<undefined, Action> {
  const content = useMemo(() => callback(), [callback]);

  const render = useCallback(
    () => createPortal(content, container),
    [content, container]
  );

  return [, { render }];
}

export {
  usePortal
}



