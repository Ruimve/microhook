import { useCallback } from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import { usePortal } from '../index';
import { act } from 'react-dom/test-utils';

describe('测试 usePortal', () => {
  it('渲染 global component 到 body 下，而不是 root 下面', () => {
    const fn = jest.fn();
    fn.mockReturnValue(<div>global component</div>);

    const { result } = renderHook((props) => usePortal(props.callback, props.dom), {
      initialProps: {
        callback: fn,
        dom: document.body
      }
    });

    act(() => {
      render(result.current[1].render());
    });

    const com = screen.getByText('global component');
    expect(com.parentElement).toEqual(document.body);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});