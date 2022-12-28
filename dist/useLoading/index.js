var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useState, useCallback } from "react";
function createResponse(loading, data = null) {
    return {
        loading,
        data
    };
}
function useLoading(request) {
    const [response, setResponse] = useState({ loading: false, data: null });
    const wrapRequset = useCallback((...args) => __awaiter(this, void 0, void 0, function* () {
        setResponse(createResponse(true));
        try {
            const data = yield request(...args);
            setResponse(createResponse(false, data));
        }
        catch (e) {
            // @ts-ignore
            setResponse(createResponse(false, e));
        }
    }), [request]);
    return [response, wrapRequset];
}
export { useLoading };
