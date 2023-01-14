import { useCallback } from 'react';
import ReactDOM from 'react-dom';

/**
 * @param callback Make sure to using with useCallback and React.memo, see `demo` for details.
 * @param container html element, like `document.body`.
 * @returns Render function: () => JSX.Element
 */
function usePortal(callback: () => React.ReactNode, container: HTMLElement) {
  const render = useCallback(
    () => {
      const result = callback();
      return ReactDOM.createPortal(result, container)
    },
    [callback, container]
  );
  return render;
}

export {
  usePortal
}