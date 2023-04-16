import { useRef, RefObject, useEffect } from 'react';
import { ReturnValue } from '../define';

interface Action { }

function useOutClick<T extends HTMLElement>(handler: () => void): ReturnValue<RefObject<T>, Action> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        handler();
      }
    }
    window.addEventListener('mousedown', handleClickOutside);


    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    }
  }, [handler]);

  return [ref, {}];
}

export {
  useOutClick
}