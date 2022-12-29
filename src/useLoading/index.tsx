/**
 * @author jingyu
 * @description 处理接口或者 Promise 的 pending 状态
 */

import { useState, useCallback } from "react";

interface Response<T> {
  loading: boolean;
  data: T | null;
}

function createResponse<T>(loading: boolean, data: T | null = null): Response<T> {
  return {
    loading,
    data
  }
}

function useLoading<T>(request: (...args: any[]) => Promise<T>): [Response<T>, (...args: any[]) => Promise<void>] {
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
  
  return [response, wrapRequset]
}

export {
  useLoading
}