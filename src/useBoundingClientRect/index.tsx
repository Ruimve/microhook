import React, { useState, useEffect, useCallback } from 'react';

interface Options {
  // 是否监听元素变化
  observer?: boolean;
}

interface Rect {
  top: number;
  right: number;
  bottom: number;
  left: number;
  height: number;
  width: number;
  x: number;
  y: number;
}

type RectElement = React.MutableRefObject<Element | null> | Element | null;

const initialRect = { top: 0, right: 0, bottom: 0, left: 0, height: 0, width: 0, x: 0, y: 0 };

function useBoundingClientRect(element: RectElement, options: Options = { observer: true }, deps: React.DependencyList = []) {
  const [rect, setRect] = useState<Rect>(initialRect);

  const findDOM = (ele: RectElement) => ele instanceof Element ? ele : ele?.current;

  const calcHeight = useCallback(() => {
    const dom = findDOM(element);
    const { top = 0, right = 0, bottom = 0, left = 0, height = 0, width = 0, x = 0, y = 0 } = dom?.getBoundingClientRect() || {};
    setRect({ top, right, bottom, left, height, width, x, y });
  }, [element])

  useEffect(() => {
    const observer = new ResizeObserver(calcHeight);
    if (options?.observer) {
      const dom = findDOM(element);
      dom && observer.observe(dom);
    } else {
      calcHeight();
    }

    return () => {
      observer.disconnect();
    }
    // eslint-disable-next-line
  }, [element, JSON.stringify(options), calcHeight, ...deps]);

  return rect;
}

export {
  useBoundingClientRect
}