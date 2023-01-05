declare abstract class AbstractBus {
    protected bus: Map<string, Function[]>;
    constructor(bus: Map<string, Function[]>);
    abstract on(name: string, callback: Function): void;
    abstract emit(name: string, ...args: any[]): void;
    abstract off(name: string): void;
    abstract destory(): void;
}
declare class Bus extends AbstractBus {
    protected bus: Map<string, Function[]>;
    constructor(bus: Map<string, Function[]>);
    on(name: string, callback: Function): void;
    emit(name: string, ...args: any[]): void;
    off(name: string): void;
    destory(): void;
}
declare function useBus(): Bus;
export { useBus, Bus };
