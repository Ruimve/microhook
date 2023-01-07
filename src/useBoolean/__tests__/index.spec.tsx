import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useBoolean } from '../index';

describe('测试 useBoolean', () => {
  it('不设定初始值, 获取结果为 false', () => {
    const { result } = renderHook(() => useBoolean());
    expect(result.current[0]).toEqual(false);
  });

  it('设置初始值为 true', () => {
    const { result } = renderHook(props => useBoolean(props.bool), {
      initialProps: {
        bool: true
      }
    });
    expect(result.current[0]).toEqual(true);
  });

  it('设置初始值为 false', () => {
    const { result } = renderHook(props => useBoolean(props.bool), {
      initialProps: {
        bool: false
      }
    });
    expect(result.current[0]).toEqual(false);
  });

  it('设置初始值为 true, toggle 取反布尔状态', () => {
    const { result } = renderHook(props => useBoolean(props.bool), {
      initialProps: {
        bool: true
      }
    });
    expect(result.current[0]).toEqual(true);

    act(() => result.current[1]());
    expect(result.current[0]).toEqual(false);

    act(() => result.current[1]());
    expect(result.current[0]).toEqual(true);
  });

  it('设置初始值为 true, toggle 切换指定状态', () => {
    const { result } = renderHook(props => useBoolean(props.bool), {
      initialProps: {
        bool: true
      }
    });
    expect(result.current[0]).toEqual(true);

    // 指定布尔值为 true
    act(() => result.current[1](true));
    expect(result.current[0]).toEqual(true);

    // 指定布尔值为 false
    act(() => result.current[1](false));
    expect(result.current[0]).toEqual(false);

    // 指定布尔值为 false
    act(() => result.current[1](false));
    expect(result.current[0]).toEqual(false);

    // 指定布尔值为 true
    act(() => result.current[1](true));
    expect(result.current[0]).toEqual(true);
  });
});