/**
 * @author Ruimve
 */

import { useState, useEffect, RefObject } from 'react';
import { ReturnValue } from '../define';

type ElementArg = string | RefObject<HTMLElement>;

interface Action {
  recalculateHeight: () => void;
}

/**
 * Gets the HTMLElement from a string or RefObject.
 * 
 * @param element - The string selector or RefObject to get the HTMLElement from.
 * @returns The HTMLElement or null.
 */
function getElement(element: ElementArg | null | undefined): HTMLElement | null {
  if (element instanceof Object && element.current instanceof HTMLElement) {
    return element.current;
  } else if (typeof element === 'string') {
    return document.querySelector(element);
  } else {
    return null;
  }
}

/**
 * Returns an array with the remaining height of the parent element 
 * after subtracting the height of its child elements and any specified offsets.
 * 
 * @param parent - The parent element or its RefObject.
 * @param children - The child elements or their RefObjects.
 * @param offsets - The offsets to subtract from the parent element's height.
 * @returns An array with the remaining height and a recalculateHeight function.
 */
function useRestHeight(
  parent?: ElementArg,
  children?: ElementArg[],
  offsets: number[] = [],
): ReturnValue<number, Action> {
  const [restHeight, setRestHeight] = useState<number>(0);

  /**
   * Calculates the remaining height of the parent element and sets the restHeight state.
   */
  const updateHeight = () => {
    const parentElement = getElement(parent);
    const childElements =
      children?.flatMap((child) =>
        Array.from(getElement(child) ? [getElement(child)!] : []),
      ) ?? [];

    if (!parentElement) {
      return;
    }

    const parentHeight = parentElement.getBoundingClientRect().height;
    const childHeight = childElements.reduce(
      (totalHeight, childRef) => totalHeight + childRef.getBoundingClientRect().height,
      0,
    );

    const totalOffset = offsets.reduce((acc, curr) => acc + curr, 0);
    setRestHeight(parentHeight - childHeight - totalOffset);
  }

  /**
   * Sets up ResizeObservers on the parent and child elements to update the restHeight state.
   * Returns a cleanup function to disconnect the observers.
   */
  useEffect(() => {
    updateHeight();

    const parentElement = getElement(parent);
    const childElements =
      children?.flatMap((child) =>
        Array.from(getElement(child) ? [getElement(child)!] : []),
      ) ?? [];

    if (parentElement) {
      const parentObserver = new ResizeObserver(updateHeight);
      parentObserver.observe(parentElement);

      const childObservers = childElements.map((child) => {
        const observer = new ResizeObserver(updateHeight);
        observer.observe(child);
        return observer;
      });

      return () => {
        parentObserver.disconnect();
        childObservers.forEach((observer) => observer.disconnect());
      };
    }
  }, [parent, children, offsets]);

  return [restHeight, { recalculateHeight: updateHeight }];
}

export { useRestHeight };