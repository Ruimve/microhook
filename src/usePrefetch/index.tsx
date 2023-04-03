// Import dependencies
import type { ResourceType, Resource } from './createResource';
import { useEffect, useRef, useCallback } from 'react';
import { createResource, isHTMLLinkElement } from './createResource';
import { ReturnValue } from '../define';

// Define options type
type Options = {
  type?: ResourceType;
  crossOrigin?: 'anonymous' | 'use-credentials';
  maxRetryTimes?: number;
  maxConcurrent?: number;
  onLoad?: (resource: Resource) => void;
};

// Define resource item type
type ResourceItem = {
  url: string;
  retryTimes: number;
  element: Resource;
};

// Define action interface
interface Action { }

// Define the usePrefetch hook
function usePrefetch(urls: string[] | string, options: Options = {}): ReturnValue<Record<string, Resource>, Action> {
  // Destructure options
  const {
    type = 'image',
    crossOrigin,
    maxRetryTimes = 3,
    onLoad = () => { },
  } = options;

  // Create refs for cache and queue
  const cacheRef = useRef<Record<string, Resource>>({});
  const queueRef = useRef<ResourceItem[]>([]);

  // Define the handleLoad function
  const handleLoad = useCallback((resource: Resource) => {
    const item = queueRef.current.find((item) => item.element === resource);
    if (item) {
      // Add the loaded resource to the cache
      cacheRef.current[item.url] = resource;
      // Remove the item from the queue
      queueRef.current = queueRef.current.filter((queue) => queue !== item);
      // Call the onLoad callback
      onLoad(resource);
    }
  }, [onLoad]);

  // Define the handleError function
  const handleError = useCallback((resource: Resource) => {
    const item = queueRef.current.find((item) => item.element === resource);
    if (item) {
      // Increment the retry count
      item.retryTimes += 1;
      // Retry loading the resource if retry count is less than maxRetryTimes
      if (item.retryTimes < maxRetryTimes) {
        if (isHTMLLinkElement(item.element)) {
          item.element.href = `${item.url}?retry=${item.retryTimes}`;
        } else {
          item.element.src = `${item.url}?retry=${item.retryTimes}`;
        }
      } else {
        // Remove the item from the queue if retry count is equal to maxRetryTimes
        queueRef.current = queueRef.current.filter(queue => queue !== item);
      }
    }
  }, [maxRetryTimes]);

  // Add resources to the queue and listen for load and error events
  useEffect(() => {
    const urlsArr = Array.isArray(urls) ? urls : [urls];
    const handles = urlsArr.map((url) => {
      if (cacheRef.current[url]) {
        return {}
      }

      const resource = createResource(url, type, crossOrigin);

      const handleResourceLoad = () => handleLoad(resource);
      const handleResourceError = () => handleError(resource);

      resource.addEventListener('load', handleResourceLoad);
      resource.addEventListener('error', handleResourceError);

      const item: ResourceItem = { url, retryTimes: 0, element: resource };
      queueRef.current = [...queueRef.current, item];
      return {
        element: resource,
        handleResourceLoad,
        handleResourceError
      }
    });

    // Remove event listeners when component unmounts
    return () => {
      handles.forEach(handle => {
        handle?.element?.removeEventListener('load', handle.handleResourceLoad);
        handle?.element?.removeEventListener('error', handle.handleResourceError);
      })
    }

  }, [urls, crossOrigin, type, handleError, handleLoad]);

  return [cacheRef.current, {}]
}

export {
  usePrefetch
}


