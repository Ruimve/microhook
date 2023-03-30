/**
 * @author Ruimve
 * @description Handles the pending status of API or Promise.
 */

 import { useState, useCallback } from "react";
 import { ReturnTypeWithPromise, ReturnValue } from '../define';
 
 type IFunction = (...args: any[]) => Promise<any>;
 type IArray = any[];
 
 interface Response<T> {
   loading: boolean; // Whether the request is loading
   data: T | null; // The data returned by the request
 }
 
 interface Action<T extends IArray> {
   wrapRequset: (...args: T) => Promise<void>; // A function that wraps the request and handles loading state
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
   U extends ReturnTypeWithPromise<T> | Error = ReturnTypeWithPromise<T>
 >(request: IFunction): ReturnValue<Response<U>, Action<P>> {
   // Use React hook to manage state
   const [response, setResponse] = useState<Response<U>>({ loading: false, data: null });
 
   const wrapRequset = useCallback(
     async (...args: P) => {
       setResponse(createResponse<U>(true)); // Set loading state to true
       try {
         const data = await request(...args); // Execute request
         setResponse(createResponse<U>(false, data)); // Set loading state to false and store the response data
       } catch (e) {
         setResponse(createResponse<U>(false, e as U)); // If an error occurs, set loading state to false and store the error
       }
     },
     [request]
   )
 
   return [response, { wrapRequset }]
 }
 
 export {
   useLoading
 }
 