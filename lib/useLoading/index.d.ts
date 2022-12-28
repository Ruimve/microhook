interface Response<T> {
    loading: boolean;
    data: T | null;
}
declare function useLoading<T>(request: (...args: any[]) => Promise<T>): [Response<T>, (...args: any[]) => Promise<void>];
export { useLoading };
