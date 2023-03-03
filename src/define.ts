export type ReturnValue<T, P extends Object> = [T, P];

export type ReturnTypeWithPromise<T extends (...args: any[]) => Promise<any>> = T extends (...args: any[]) => Promise<infer R> ? R : any;