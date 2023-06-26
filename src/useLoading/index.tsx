/**
 * @author Ruimve
 * @description Handles the pending status of API or Promise.
 */

import { useState, useCallback } from "react";
import { ReturnTypeWithPromise, ReturnValue } from '../define';

type IFunction = (...args: any[]) => Promise<any>;
type IArray = any[];
type IReturn = any;

interface Response<T> {
  loading: boolean; // Whether the request is loading
  data: T | null; // The data returned by the request
}

interface Action<T extends IArray, U> {
  wrapRequset: (...args: T) => Promise<U>; // A function that wraps the request and handles loading state
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
  U extends IReturn = ReturnTypeWithPromise<T>
>(request: IFunction): ReturnValue<Response<U>, Action<P, U>> {
  // Use React hook to manage state
  const [response, setResponse] = useState<Response<U>>({ loading: false, data: null });

  const wrapRequset = useCallback(
    async (...args: P) => {
      try {
        setResponse(createResponse<U>(true, response.data)); // Set loading state to true
        const data = await request(...args); // Execute request
        setResponse(createResponse<U>(false, data)); // Set loading state to false and store the response data
        return data;
      } catch (e) {
        setResponse(createResponse<U>(false, response.data));
        return response.data;
      }
    },
    [request, response]
  )

  return [response, { wrapRequset }]
}

export {
  useLoading
}
