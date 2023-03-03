/**
 * @author jingyu
 * @description 处理接口或者 Promise 的 pending 状态
 */

import { useState, useCallback } from "react";
import { ReturnTypeWithPromise, ReturnValue } from '../define';

type IFunction = (...args: any[]) => Promise<any>;
type IArray = any[];

interface Response<T> {
  loading: boolean;
  data: T | null;
}

interface Action<T extends IArray> {
  wrapRequset: (...args: T) => Promise<void>;
}

function createResponse<T>(loading: boolean, data: T | null = null): Response<T> {
  return {
    loading,
    data
  }
}

function useLoading<
  T extends IFunction,
  P extends IArray = Parameters<T>,
  U = ReturnTypeWithPromise<T>
>(request: IFunction): ReturnValue<Response<U>, Action<P>> {

  const [response, setResponse] = useState<Response<U>>({ loading: false, data: null });

  const wrapRequset = useCallback(
    async (...args: P) => {
      setResponse(createResponse<U>(true));
      try {
        const data = await request(...args);
        setResponse(createResponse<U>(false, data));
      } catch (e) {
        // @ts-ignore
        setResponse(createResponse<typeof e>(false, e));
      }
    },
    [request]
  )

  return [response, { wrapRequset }]
}

export {
  useLoading
}