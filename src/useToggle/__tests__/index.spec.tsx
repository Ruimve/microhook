import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useToggle } from '../index';

describe('测试 useToggle', () => {
  it('有小明和小花两个人, 使用 setLeft 和 setRight 得到人员信息', async () => {
    const left = { name: '小明', age: '18' };
    const right = { name: '小花', age: '19' };
    const { result } = renderHook(props => useToggle(props.left, props.right), {
      initialProps: { left, right }
    });

    // 初始状态为小明
    expect(result.current[0]).toEqual(left);

    // 点击设定右边的小花 得到状态为小花
    act(() => result.current[1].setRight());
    expect(result.current[0]).toEqual(right);

    // 点击设定左边的小明 得到状态为小明
    act(() => result.current[1].setLeft());
    expect(result.current[0]).toEqual(left);
  });

  it('有小明和小花两个人, 不管左右位置, 互相切换', async () => {
    const left = { name: '小明', age: '18' };
    const right = { name: '小花', age: '19' };
    const { result } = renderHook(props => useToggle(props.left, props.right), {
      initialProps: { left, right }
    });

    // 初始状态为小明
    expect(result.current[0]).toEqual(left);

    // 点击切换 得到状态为小花
    act(() => result.current[1].toggle());
    expect(result.current[0]).toEqual(right);

    // 点击切换 得到状态为小明
    act(() => result.current[1].toggle());
    expect(result.current[0]).toEqual(left);

    // 点击切换 得到状态为小花
    act(() => result.current[1].toggle());
    expect(result.current[0]).toEqual(right);

    // 点击切换 得到状态为小明
    act(() => result.current[1].toggle());
    expect(result.current[0]).toEqual(left);
  });
});