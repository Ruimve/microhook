import { useState, useCallback, useEffect, useRef } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 * @author jingyu
 * @description 处理接口或者 Promise 的 pending 状态
 */
function createResponse(loading, data = null) {
    return {
        loading,
        data
    };
}
function useLoading(request) {
    const [response, setResponse] = useState({ loading: false, data: null });
    const wrapRequset = useCallback((...args) => __awaiter(this, void 0, void 0, function* () {
        setResponse(createResponse(true));
        try {
            const data = yield request(...args);
            setResponse(createResponse(false, data));
        }
        catch (e) {
            // @ts-ignore
            setResponse(createResponse(false, e));
        }
    }), [request]);
    return [response, wrapRequset];
}

/**
 * @author jingyu
 * @description 计算指定元素被子元素占据后的剩余高度
 */
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

class AbstractBus {
    constructor(bus) {
        this.bus = bus;
    }
}
class Bus extends AbstractBus {
    constructor(bus) {
        super(bus);
        this.bus = bus;
    }
    on(name, callback) {
        if (this.bus.has(name)) {
            const fns = this.bus.get(name) || [];
            this.bus.set(name, [...fns, callback]);
        }
        else {
            this.bus.set(name, [callback]);
        }
    }
    emit(name, ...args) {
        if (this.bus.has(name)) {
            const fns = this.bus.get(name) || [];
            fns.forEach(fn => fn.call(null, ...args));
        }
    }
    off(name) {
        this.bus.delete(name);
    }
    destory() {
        this.bus.clear();
    }
}
function useBus() {
    const ref = useRef();
    if (!ref.current) {
        ref.current = new Bus(new Map());
    }
    return ref.current;
}

export { useBus, useLoading, useRestHeight };
