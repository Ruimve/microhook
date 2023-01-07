import { renderHook, act } from '@testing-library/react';
import { useBus } from '../index';

describe('测试 useBus', () => {
  it('添加 call 事件, 调用 emit 触发 call 事件, 得到状态 receive', () => {
    const { result } = renderHook(() => useBus());
    const bus = result.current;

    let state: string[] = [];
    let lover = 'robot';
    bus.on('call', (name: string) => state.push(`receive:${name}`));
    bus.emit('call', lover);

    expect(state).toHaveLength(1);
    expect(state[0]).toEqual(`receive:${lover}`);
  });

  it('给 call 事件绑定两个动作 receive 和 recall, 调用 emit 触发 call 事件, 得到两个状态 receive 和 recall', () => {
    const { result } = renderHook(() => useBus());
    const bus = result.current;

    let state: string[] = [];
    let lover = 'robot';
    bus.on('call', (name: string) => state.push(`receive:${name}`));
    bus.on('call', (name: string) => state.push(`recall:${name}`));
    bus.emit('call', lover);

    expect(state[0]).toEqual(`receive:${lover}`);
    expect(state[1]).toEqual(`recall:${lover}`);
  });

  it('绑定一个 call 事件和一个 meet 事件, 调用 off 卸载 call 事件, 只得到 see you 状态', () => {
    const { result } = renderHook(() => useBus());
    const bus = result.current;

    let state: string[] = [];
    let lover = 'robot';
    bus.on('call', (name: string) => state.push(`receive:${name}`));
    bus.on('meet', (name: string) => state.push(`see you:${name}`));
    bus.off('call');
    bus.emit('call', lover);
    bus.emit('meet', lover);

    expect(state).toHaveLength(1);
    expect(state[0]).toEqual(`see you:${lover}`);
  });

  it('绑定一个 call 事件和一个 meet 事件, 调用 destory 销毁所有事件, 得到状态为空', () => {
    const { result } = renderHook(() => useBus());
    const bus = result.current;

    let state: string[] = [];
    let lover = 'robot';
    bus.on('call', (name: string) => state.push(`receive:${name}`));
    bus.on('meet', (name: string) => state.push(`see you:${name}`));
    bus.destory();
    bus.emit('call', lover);
    bus.emit('meet', lover);

    expect(state).toHaveLength(0);
  });

  it('重新渲染 Hook, 得到同一个 bus  对象', () => {
    const { result, rerender } = renderHook(() => useBus());
    const bus = result.current;

    let state: string[] = [];
    let lover = 'robot';
    bus.on('call', (name: string) => state.push(`receive:${name}`));
    bus.emit('call', lover);

    act(() => {
      rerender();
    });

    const rerenderBus = result.current;
    expect(rerenderBus).toEqual(bus);
  });

  it('强制将 bus Map 中的事件体置为 null, 导致事件异常', () => {
    const { result } = renderHook(() => useBus());
    const bus = result.current;

    let state: string[] = [];
    let lover = 'robot';
    bus.on('call', (name: string) => state.push(`receive:${name}`));

    //@ts-ignore
    bus.bus.set('call', null);
    bus.emit('call', lover); //事件为null, 无法触发

    bus.on('call', (name: string) => state.push(`recall:${name}`));
    bus.emit('call', lover); //此时只有一个新添加的事件体

    expect(state).toHaveLength(1);
    expect(state[0]).toEqual(`recall:${lover}`);
  });
});