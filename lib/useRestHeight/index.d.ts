/**
 * @author jingyu
 * @description 计算指定元素被子元素占据后的剩余高度
 */
import React from 'react';
type ElementType = string | React.MutableRefObject<HTMLElement | undefined> | null;
type ConfigType = {
    element: ElementType;
    observer: boolean;
};
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
declare function useRestHeight(props: Props): [number, Function];
export { useRestHeight };
