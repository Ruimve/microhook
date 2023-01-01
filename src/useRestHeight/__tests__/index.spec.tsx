import React, { useRef } from "react";
import { render, renderHook, screen } from "@testing-library/react";

import { useRestHeight } from '../index';

describe('测试 useRestHeight', () => {
  beforeAll(() => {
    window.ResizeObserver =
      window.ResizeObserver ||
      function () {
        return {
          observe: jest.fn(),
          disconnect: jest.fn(),
          unobserve: jest.fn()
        }
      };
  });

  it('当容器 container 不存在时, 高度为 0', () => {
    const { result } = renderHook(props => useRestHeight(props), {
      initialProps: {
        container: null
      }
    });
    const [restHeight] = result.current;
    expect(restHeight).toEqual(0);
  });

  it('当容器 container 高度为 200, 并且没有子元素时, 高度为 200', () => {
    const getBoundingClientRect = jest.fn().mockReturnValue({ height: 200 });
    HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;

    render(<div className="container" style={{ height: 200 }}></div>);
    const { result } = renderHook(props => useRestHeight(props), {
      initialProps: {
        container: '.container'
      }
    });

    expect(result.current[0]).toEqual(200);
  });

  it('当容器 container 高度为 200, 有两个子元素高度分别为 20、40, 高度为 140', () => {
    const getBoundingClientRect = jest.fn()
      .mockReturnValue({ height: 200 })
      .mockReturnValueOnce({ height: 200 })
      .mockReturnValueOnce({ height: 20 })
      .mockReturnValueOnce({ height: 40 })
      .mockReturnValueOnce({ height: 200 })
      .mockReturnValueOnce({ height: 20 })
      .mockReturnValueOnce({ height: 40 });;
    HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;

    render(
      <div className="container" style={{ height: 200 }}>
        <div className="first" style={{ height: 20 }} ></div>
        <div className="second" style={{ height: 40 }} ></div>
      </div>
    );
    const { result } = renderHook(props => useRestHeight(props), {
      initialProps: {
        container: '.container',
        children: ['.first', '.second']
      }
    });

    expect(result.current[0]).toEqual(140);
  });

  it('当容器 container 高度为 200, 有两个子元素高度分别为 20、40, 自定义偏移量为 5、10, 高度为 125', () => {
    const getBoundingClientRect = jest.fn()
      .mockReturnValue({ height: 200 })
      .mockReturnValueOnce({ height: 200 })
      .mockReturnValueOnce({ height: 20 })
      .mockReturnValueOnce({ height: 40 })
      .mockReturnValueOnce({ height: 200 })
      .mockReturnValueOnce({ height: 20 })
      .mockReturnValueOnce({ height: 40 });;
    HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;

    render(
      <div className="container" style={{ height: 200 }}>
        <div className="first" style={{ height: 20 }} ></div>
        <div className="second" style={{ height: 40 }} ></div>
      </div>
    );
    const { result } = renderHook(props => useRestHeight(props), {
      initialProps: {
        container: '.container',
        children: [
          { element: '.first', observer: true },
          { element: '.second', observer: false }
        ],
        offsets: [5, 10]
      }
    });

    expect(result.current[0]).toEqual(125);
  });

  it('模拟 useRef', () => {
    const getBoundingClientRect = jest.fn().mockReturnValue({ height: 200 });
    HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;

    render(<div className="container" style={{ height: 200 }}>useRef</div>);
    const ref = { current: screen.getAllByText('useRef')[0] };
    const { result } = renderHook(props => useRestHeight(props), {
      initialProps: {
        container: ref
      }
    });

    expect(result.current[0]).toEqual(200);
  })
});