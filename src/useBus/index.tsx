import { useRef } from 'react';

abstract class AbstractBus {
  constructor(protected bus: Map<string, Function[]>) { }
  public abstract on(name: string, callback: Function): void;
  public abstract emit(name: string, ...args: any[]): void;
  public abstract off(name: string): void;
  public abstract destory(): void;
}

class Bus extends AbstractBus {
  constructor(protected bus: Map<string, Function[]>) {
    super(bus);
  }

  on(name: string, callback: Function): void {
    if (this.bus.has(name)) {
      const fns = this.bus.get(name) || [];
      this.bus.set(name, [...fns, callback]);
    } else {
      this.bus.set(name, [callback])
    }
  }

  emit(name: string, ...args: any[]): void {
    if (this.bus.has(name)) {
      const fns = this.bus.get(name) || [];
      fns.forEach(fn => fn.call(null, ...args));
    }
  }

  off(name: string): void {
    this.bus.delete(name);
  }

  destory(): void {
    this.bus.clear();
  }
}

function useBus() {
  const ref = useRef<Bus>();
  if (!ref.current) {
    ref.current = new Bus(new Map());
  }
  return ref.current;
}

export {
  useBus,
  Bus
}