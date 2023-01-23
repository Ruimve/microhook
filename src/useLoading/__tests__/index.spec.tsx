import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { useLoading } from '../index';

/**
 * 模拟请求
 * @returns Promise<string>
 */

describe('测试 useLoading', () => {
  it('loading 状态', async () => {
    const people = [{ name: '小明', age: 18 }];
    const callback = jest.fn();
    callback.mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(people);
        }, 1000);
      });
    });
    const { result } = renderHook(() => useLoading<string>(callback));
    expect(result.current[0].loading).toEqual(false);
    act(() => {
      result.current[1].wrapRequset();
    });
    expect(result.current[0].loading).toEqual(true);
  });

  it('1s 后获取到小明信息', async () => {
    const people = [{ name: '小明', age: 18 }];
    const callback = jest.fn();
    callback.mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(people);
        }, 1000);
      });
    });
    const { result } = renderHook(() => useLoading<string>(callback));
    await act(async () => {
      await result.current[1].wrapRequset();
    });
    expect(result.current[0].data).toEqual(people);
  });

  it('异常捕获', async () => {
    const error = { message: '异常捕获' };
    const callback = jest.fn();
    callback.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(error);
        }, 1000);
      });
    });
    const { result } = renderHook(() => useLoading<string>(callback));
    await act(async () => {
      await result.current[1].wrapRequset();
    });

    expect(result.current[0].data).toEqual(error);
  });
});


