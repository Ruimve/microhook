/**
 * @author jingyu
 * @description 计算指定元素被子元素占据后的剩余高度
 */
import { useState, useEffect } from 'react';
function useRestHeight(props) {
    const { container, children = [], offsets = [] } = props;
    const [restHeight, setRestHeight] = useState(0);
    const findDOM = (elementConfig) => {
        //@ts-ignore
        const element = typeof (elementConfig === null || elementConfig === void 0 ? void 0 : elementConfig.element) !== 'undefined' ? elementConfig === null || elementConfig === void 0 ? void 0 : elementConfig.element : elementConfig;
        if (typeof element === 'string') {
            return Array.from(document.querySelectorAll(element));
        }
        else {
            return (element === null || element === void 0 ? void 0 : element.current) ? [element === null || element === void 0 ? void 0 : element.current] : [];
        }
    };
    const accumulate = (doms) => {
        return doms === null || doms === void 0 ? void 0 : doms.reduce((prv, cur) => { var _a; return prv + ((_a = cur === null || cur === void 0 ? void 0 : cur.getBoundingClientRect()) === null || _a === void 0 ? void 0 : _a.height); }, 0);
    };
    const calcRestHeight = () => {
        const containerDOM = findDOM(container);
        if ((containerDOM === null || containerDOM === void 0 ? void 0 : containerDOM.length) > 0) {
            const wrapperHeight = accumulate(containerDOM);
            const childrenTotal = children.reduce((prv, cur) => prv + accumulate(findDOM(cur)), 0);
            const offsetsTotal = offsets.reduce((prv, cur) => prv + cur, 0);
            return wrapperHeight - childrenTotal - offsetsTotal;
        }
        return 0;
    };
    const updateRestHeight = () => {
        const restHeight = calcRestHeight();
        setRestHeight(restHeight);
    };
    useEffect(() => {
        updateRestHeight();
    }, [container, children, offsets]);
    const observe = (resizeObserver, elementConfig) => {
        const doms = findDOM(elementConfig);
        //@ts-ignore
        const observer = typeof (elementConfig === null || elementConfig === void 0 ? void 0 : elementConfig.observer) !== 'undefined' ? elementConfig === null || elementConfig === void 0 ? void 0 : elementConfig.observer : true;
        if (observer) {
            doms === null || doms === void 0 ? void 0 : doms.forEach(dom => resizeObserver.observe(dom));
        }
    };
    useEffect(() => {
        /** 创建监听器 */
        const resizeObserver = new ResizeObserver(updateRestHeight);
        /** 给容器添加监听 */
        observe(resizeObserver, container);
        /** 给子元素添加监听 */
        children === null || children === void 0 ? void 0 : children.forEach(child => observe(resizeObserver, child));
        return () => {
            resizeObserver.disconnect();
        };
    }, [container, children]);
    return [restHeight, updateRestHeight];
}
export { useRestHeight };
