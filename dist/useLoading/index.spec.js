var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useLoading } from './index';
/**
 * 模拟请求
 * @returns Promise<string>
 */
describe('测试 useLoading', () => {
    it('loading 状态', () => __awaiter(void 0, void 0, void 0, function* () {
        const people = [{ name: '小明', age: 18 }];
        const callback = jest.fn();
        callback.mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(people);
                }, 1000);
            });
        });
        const { result } = renderHook(() => useLoading(callback));
        expect(result.current[0].loading).toEqual(false);
        act(() => {
            result.current[1]();
        });
        expect(result.current[0].loading).toEqual(true);
    }));
    it('1s 后获取到小明信息', () => __awaiter(void 0, void 0, void 0, function* () {
        const people = [{ name: '小明', age: 18 }];
        const callback = jest.fn();
        callback.mockImplementation(() => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(people);
                }, 1000);
            });
        });
        const { result } = renderHook(() => useLoading(callback));
        yield act(() => __awaiter(void 0, void 0, void 0, function* () {
            yield result.current[1]();
        }));
        expect(result.current[0].data).toEqual(people);
    }));
});
