import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { useLoading } from '../index';

/**
 * Simulate a request
 * @returns Promise<string>
 */

describe('Test useLoading', () => {
  it('loading status', async () => {
    const people = [{ name: 'Xiao Ming', age: 18 }];
    const callback = jest.fn();
    callback.mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(people);
        }, 1000);
      });
    });
    const { result } = renderHook(() => useLoading<typeof callback>(callback));
    expect(result.current[0].loading).toEqual(false);
    act(() => {
      result.current[1].wrapRequset();
    });
    expect(result.current[0].loading).toEqual(true);
  });

  it('get Xiao Ming information after 1s', async () => {
    const people = [{ name: 'Xiao Ming', age: 18 }];
    const callback = jest.fn();
    callback.mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(people);
        }, 1000);
      });
    });
    const { result } = renderHook(() => useLoading<typeof callback>(callback));
    await act(async () => {
      await result.current[1].wrapRequset();
    });
    expect(result.current[0].data).toEqual(people);
  });

  it('exception handling', async () => {
    const error = { message: 'exception caught' };
    const callback = jest.fn();
    callback.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(error);
        }, 1000);
      });
    });
    const { result } = renderHook(() => useLoading<typeof callback>(callback));
    await act(async () => {
      await result.current[1].wrapRequset();
    });

    expect(result.current[0].data).toEqual(null);
  });


  it('second times if error return prvious value', async () => {
    const people = [{ name: 'Xiao Ming', age: 18 }];
    const error = { message: 'exception caught' };
    let count = 0;
    const callback = jest.fn();
    callback.mockImplementation(() => {
      if(count === 0){
        return new Promise((resolve) => {
          setTimeout(() => {
            count = 1
            resolve(people);
          }, 1000);
        });
      }else{
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(error);
          }, 1000);
        });
      }
    });
    const { result } = renderHook(() => useLoading<typeof callback>(callback));
    await act(async () => {
      await result.current[1].wrapRequset();
    });
    expect(result.current[0].data).toEqual(people);

    /** second times if error return prvious value **/
    await act(async () => {
      await result.current[1].wrapRequset();
    });
    
    expect(result.current[0].data).toEqual(people);

  });
  
});