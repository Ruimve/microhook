/**
 * @author jingyu
 * @description 计算指定元素被子元素占据后的剩余高度
 */
import React, { useState, useEffect } from 'react';

type ElementType = string | React.MutableRefObject<HTMLElement | undefined> | null;
type ConfigType = { element: ElementType, observer: boolean };
type ElementConfigType = ElementType | ConfigType;

interface Props {
  /** 
   * 容器
   * 如果是 string 表明是 dom 选择器
   * 如果是  表明是 dom-ref
   */
  container?: ElementConfigType;

  /** 
   * child 元素，可以有多个 
   * 类型同 container
   */
  children?: Array<ElementConfigType>;

  /** 自定义偏移量 */
  offsets?: number[];
}

function useRestHeight(props: Props): [number, Function] {
  const { container, children = [], offsets = [] } = props;
  const [restHeight, setRestHeight] = useState<number>(0);

  const findDOM = (elementConfig?: ElementConfigType): HTMLElement[] => {
    //@ts-ignore
    const element = typeof elementConfig?.element !== 'undefined' ? elementConfig?.element : elementConfig;

    if (typeof element === 'string') {
      return Array.from(document.querySelectorAll(element)) as HTMLElement[];
    } else {
      return element?.current ? [element?.current] : [];
    }
  }

  const accumulate = (doms: HTMLElement[]) => {
    return doms?.reduce((prv, cur) => prv + cur?.getBoundingClientRect()?.height, 0);
  }

  const calcRestHeight = () => {
    const containerDOM = findDOM(container);
    if (containerDOM?.length > 0) {
      const wrapperHeight = accumulate(containerDOM);
      const childrenTotal = children.reduce((prv, cur) => prv + accumulate(findDOM(cur)), 0);
      const offsetsTotal = offsets.reduce((prv, cur) => prv + cur, 0);
      return wrapperHeight - childrenTotal - offsetsTotal;
    }
    return 0;
  }

  const updateRestHeight = () => {
    const restHeight = calcRestHeight();
    setRestHeight(restHeight);
  }

  useEffect(() => {
    updateRestHeight();
  }, [container, children, offsets]);


  const observe = (resizeObserver: ResizeObserver, elementConfig?: ElementConfigType) => {
    const doms = findDOM(elementConfig);
    //@ts-ignore
    const observer = typeof elementConfig?.observer !== 'undefined' ? elementConfig?.observer : true;

    if (observer) {
      doms?.forEach(dom => resizeObserver.observe(dom));
    }
  }

  useEffect(() => {
    /** 创建监听器 */
    const resizeObserver = new ResizeObserver(updateRestHeight);

    /** 给容器添加监听 */
    observe(resizeObserver, container);

    /** 给子元素添加监听 */
    children?.forEach(child => observe(resizeObserver, child));

    return () => {
      resizeObserver.disconnect();
    }
  }, [container, children]);

  return [restHeight, updateRestHeight];
}

export {
  useRestHeight
}