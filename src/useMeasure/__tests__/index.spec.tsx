import { render, renderHook, screen } from '@testing-library/react';
import { useMeasure, Measure } from '../';

function mockResizeObserver(contentRect: Measure) {
  window.ResizeObserver =
    function (callback: (entries: { contentRect: Measure }[]) => void) {
      callback([{ contentRect }]);
      return {
        observe: jest.fn(),
        disconnect: jest.fn(),
        unobserve: jest.fn()
      }
    } as any;
}

describe('useMeasure', () => {
  it('should return correct initial value', () => {
    const noElement = { width: undefined, height: undefined, top: undefined, right: undefined, bottom: undefined, left: undefined, x: undefined, y: undefined };

    mockResizeObserver(noElement);

    const { result } = renderHook(() => useMeasure('#test'));
    expect(result.current[0]).toEqual({
      width: undefined,
      height: undefined,
      top: undefined,
      right: undefined,
      bottom: undefined,
      left: undefined,
      x: undefined,
      y: undefined
    });
  });

  it('should return correct measure value after resize', () => {
    mockResizeObserver({ width: 100, height: 200, top: 300, right: 400, bottom: 500, left: 600, x: 10, y: 20 });

    render(<div className="test" style={{ height: 200 }}></div>);
    const { result } = renderHook(() => useMeasure('.test'));

    const measure = result.current[0];
    expect(measure.width).toEqual(100);
    expect(measure.height).toEqual(200);
    expect(measure.top).toEqual(300);
    expect(measure.right).toEqual(400);
    expect(measure.bottom).toEqual(500);
    expect(measure.left).toEqual(600);
    expect(measure.x).toEqual(10);
    expect(measure.y).toEqual(20);
  });

  it('should return correct measure value after resize with ref', () => {
    mockResizeObserver({ width: 100, height: 200, top: 300, right: 400, bottom: 500, left: 600, x: 10, y: 20 });

    render(<div className="test" style={{ height: 200 }}>useRef</div>);
    const ref = { current: screen.getAllByText('useRef')[0] };
    const { result } = renderHook(() => useMeasure(ref));

    const measure = result.current[0];
    expect(measure.width).toEqual(100);
    expect(measure.height).toEqual(200);
    expect(measure.top).toEqual(300);
    expect(measure.right).toEqual(400);
    expect(measure.bottom).toEqual(500);
    expect(measure.left).toEqual(600);
    expect(measure.x).toEqual(10);
    expect(measure.y).toEqual(20);
  });
});