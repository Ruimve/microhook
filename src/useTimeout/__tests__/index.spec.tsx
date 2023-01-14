import { renderHook } from '@testing-library/react';
import { useTimeout } from '../index';

describe('测试 useTimeout', () => {
  it('创建一个回调函数 fn, 用 on 方法开启定时器, 当时间到定时器开始执行时, fn 被调用的次数为 1', () => {
    const fn = jest.fn();
    const { result } = renderHook((props) => useTimeout(props.callback, props.delay), {
      initialProps: {
        callback: fn,
        delay: 1000
      }
    });

    const [on] = result.current;
    jest.useFakeTimers();
    on();
    jest.runAllTimers();
    expect(fn.mock.calls.length).toEqual(1);
  });

  it('创建一个回调函数 fn, 用 on 方法开启定时器, 然后立即调用 off, 定时器不会执行, fn 被调用的次数为 0', () => {
    const fn = jest.fn();
    const { result } = renderHook((props) => useTimeout(props.callback, props.delay), {
      initialProps: {
        callback: fn,
        delay: 1000
      }
    });

    const [on, off] = result.current;
    jest.useFakeTimers();
    on();
    off();
    jest.runAllTimers();
    expect(fn.mock.calls.length).toEqual(0);
  });

  it('delay 默认值为 0', () => {
    const fn = jest.fn();
    const { result } = renderHook((props) => useTimeout(props.callback), {
      initialProps: {
        callback: fn
      }
    });

    const [on] = result.current;
    jest.useFakeTimers();
    on();
    jest.runAllTimers();
    expect(fn.mock.calls.length).toEqual(1);
  });
});