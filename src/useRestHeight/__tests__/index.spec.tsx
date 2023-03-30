import React from "react";
import { render, renderHook, screen } from "@testing-library/react";

import { useRestHeight } from '../index';

describe('Test useRestHeight', () => {
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

  it('should have a height of 0 when parent container does not exist', () => {
    const { result } = renderHook(
      props => useRestHeight(props.parent), {
      initialProps: {
        parent: undefined
      }
    }
    );
    const [restHeight] = result.current;
    expect(restHeight).toEqual(0);
  });

  it('should have a height of 200 when parent container has a height of 200 and no child elements', () => {
    const getBoundingClientRect = jest.fn().mockReturnValue({ height: 200 });
    HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;

    render(<div className="parent" style={{ height: 200 }}></div>);
    const { result } = renderHook(
      props => useRestHeight(props.parent),
      {
        initialProps: {
          parent: '.parent'
        }
      }
    );

    expect(result.current[0]).toEqual(200);
  });

  it('should have a height of 140 when parent container has a height of 200 and two child elements have heights of 20 and 40 respectively', () => {
    const getBoundingClientRect = jest.fn()
      .mockReturnValue({ height: 200 })
      .mockReturnValueOnce({ height: 200 })
      .mockReturnValueOnce({ height: 20 })
      .mockReturnValueOnce({ height: 40 })
      .mockReturnValueOnce({ height: 200 })
      .mockReturnValueOnce({ height: 20 })
      .mockReturnValueOnce({ height: 40 });
    HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;

    render(
      <div className="parent" style={{ height: 200 }}>
        <div className="first" style={{ height: 20 }} ></div>
        <div className="second" style={{ height: 40 }} ></div>
      </div>
    );
    const { result } = renderHook(
      props => useRestHeight(props.parent, props.children),
      {
        initialProps: {
          parent: '.parent',
          children: ['.first', '.second']
        }
      }
    );

    expect(result.current[0]).toEqual(140);
  });

  it('should have a height of 140 when parent container has a height of 200 and two child elements have heights of 20 and 40 respectively and elements are accessed by ID', () => {
    const getBoundingClientRect = jest.fn()
      .mockReturnValue({ height: 200 })
      .mockReturnValueOnce({ height: 200 })
      .mockReturnValueOnce({ height: 20 })
      .mockReturnValueOnce({ height: 40 })
      .mockReturnValueOnce({ height: 200 })
      .mockReturnValueOnce({ height: 20 })
      .mockReturnValueOnce({ height: 40 })
    HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;

    render(
      <div className="parent" style={{ height: 200 }}>
        <div className="first" style={{ height: 20 }} ></div>
        <div id="second" style={{ height: 40 }} ></div>
      </div>
    );
    const { result } = renderHook(
      props => useRestHeight(props.parent, props.children),
      {
        initialProps: {
          parent: '.parent',
          children: ['.first', '#second', '#third']
        }
      }
    );

    expect(result.current[0]).toEqual(140);
  });

  it('when parent container has a height of 200, two child elements with heights of 20 and 40 respectively, custom offsets of 5 and 10, and a height of 125', () => {
    const getBoundingClientRect = jest.fn()
      .mockReturnValue({ height: 200 })
      .mockReturnValueOnce({ height: 200 })
      .mockReturnValueOnce({ height: 20 })
      .mockReturnValueOnce({ height: 40 })
      .mockReturnValueOnce({ height: 200 })
      .mockReturnValueOnce({ height: 20 })
      .mockReturnValueOnce({ height: 40 });
    HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;

    render(
      <div className="parent" style={{ height: 200 }}>
        <div className="first" style={{ height: 20 }} ></div>
        <div className="second" style={{ height: 40 }} ></div>
      </div>
    );
    const { result } = renderHook(
      props => useRestHeight(props.parent, props.children, props.offsets),
      {
        initialProps: {
          parent: '.parent',
          children: ['.first', '.second'],
          offsets: [5, 10]
        }
      }
    );

    expect(result.current[0]).toEqual(125);
  });

  it('simulates useRef', () => {
    const getBoundingClientRect = jest.fn().mockReturnValue({ height: 200 });
    HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;

    render(<div className="parent" style={{ height: 200 }}>useRef</div>);
    const ref = { current: screen.getAllByText('useRef')[0] };
    const { result } = renderHook(
      props => useRestHeight(props.parent),
      {
        initialProps: {
          parent: ref
        }
      }
    );

    expect(result.current[0]).toEqual(200);
  });
});