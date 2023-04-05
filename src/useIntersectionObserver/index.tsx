import { useEffect, useState, RefObject } from 'react';
import { ReturnValue } from '../define';

interface IntersectionObserverProps {
  root?: HTMLElement | null; // The element that is used as the viewport for checking the visibility of the target element.
  rootMargin?: string; // Margin around the root element.
  threshold?: number | number[]; // A single number or an array of numbers indicating at what percentage of the target's visibility the observer's callback should be executed.
}

interface Action { }

/**
 * A hook that uses the Intersection Observer API to track whether a specified HTML element is currently visible on the screen.
 * @param ref A React ref object that holds a reference to the HTML element to be observed.
 * @param options An object that holds optional values for the root element, margin around the root element, and threshold percentage for triggering the observer's callback.
 * @returns An array of two values: the current IntersectionObserverEntry object representing the observed element's intersection data, and an empty action object.
 */
export function useIntersectionObserver<T extends HTMLElement>(
  ref: RefObject<T>,
  {
    root = null,
    rootMargin = '0px',
    threshold = 0,
  }: IntersectionObserverProps
): ReturnValue<IntersectionObserverEntry | null, Action> {
  const [intersectionObserverEntry, setIntersectionObserverEntry] = useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    // Create an Intersection Observer object
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIntersectionObserverEntry(entry); // Update state with the intersection observer entry
      },
      {
        root,
        rootMargin,
        threshold,
      }
    );

    // Start observing the target element
    if (ref.current) {
      observer.observe(ref.current);
    }

    // Stop observing the target element when the component unmounts or when the options change
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [root, rootMargin, threshold]);

  return [intersectionObserverEntry, {}];
}