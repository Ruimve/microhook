import { isType } from '../define';
import { useState, useEffect, useCallback, RefObject } from 'react';
import { ReturnValue } from '../define';

// Define type for measurements of an element
export type Measure = {
  width?: number;
  height?: number;
  top?: number,
  right?: number,
  bottom?: number,
  left?: number,
  x?: number,
  y?: number
};

// Define the types of arguments that can be passed to the hook
type ElementArg = string | RefObject<HTMLElement>;

// Define an interface for Actions, which are not used in this hook
interface Action { };

const useMeasure = (element: ElementArg): ReturnValue<Measure, Action> => {
  // Initialize state with the Measure object
  const [measure, setMeasure] = useState<Measure>({
    width: undefined,
    height: undefined,
    top: undefined,
    right: undefined,
    bottom: undefined,
    left: undefined,
    x: undefined,
    y: undefined
  });

  // Define a callback function to get the element
  const getElement = useCallback(() => {
    if (isType<string>(element, () => typeof element === 'string')) {
      // If the element argument is a string, get the element using the querySelector method
      return document.querySelector(element);
    } else {
      // If the element argument is a ref, get the element using the current property
      return element.current;
    }
  }, [element])

  // Attach a ResizeObserver to the element and update state with the new measurements
  useEffect(() => {
    const target = getElement();

    const resizeObserver = new ResizeObserver(([entry]) => {
      setMeasure({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
        top: entry.contentRect.top,
        right: entry.contentRect.right,
        bottom: entry.contentRect.bottom,
        left: entry.contentRect.left,
        x: entry.contentRect.x,
        y: entry.contentRect.y
      });
    });

    if (target) {
      resizeObserver.observe(target);
    }

    // Detach the ResizeObserver when the component is unmounted
    return () => {
      resizeObserver.disconnect();
    };
  }, [element]);

  // Return the current measurements and an empty object, since no actions are performed in this hook
  return [measure, {}];
};

export { useMeasure };