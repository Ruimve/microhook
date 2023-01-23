/**
 * @author jingyu
 * @description 处理接口或者 Promise 的 pending 状态
 */

import { useState, useCallback } from "react";
import { ReturnValue } from '../define';

interface Response<T> {
  loading: boolean;
  data: T | null;
}

interface Action {
  wrapRequset: (...args: any[]) => Promise<void>;
}

function createResponse<T>(loading: boolean, data: T | null = null): Response<T> {
  return {
    loading,
    data
  }
}

function useLoading<T>(request: (...args: any[]) => Promise<T>): ReturnValue<Response<T>, Action> {
  const [response, setResponse] = useState<Response<T>>({ loading: false, data: null });

  const wrapRequset = useCallback(
    async (...args: any[]) => {
      setResponse(createResponse<T>(true));
      try {
        const data = await request(...args);
        setResponse(createResponse<T>(false, data));
      } catch (e) {
        // @ts-ignore
        setResponse(createResponse<T>(false, e));
      }
    },
    [request]
  )

  return [response, { wrapRequset }]
}

export {
  useLoading
}