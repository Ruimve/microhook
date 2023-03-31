import '@testing-library/jest-dom';
import { render, renderHook, screen } from '@testing-library/react';
import { usePortal } from '../index';
import { act } from 'react-dom/test-utils';

describe('Test usePortal', () => {
  it('Does not render content if container does not exist', () => {
    const fn = jest.fn();
    fn.mockReturnValue(<div>global component</div>);

    const { result } = renderHook((props) => usePortal(props.callback, props.dom), {
      initialProps: {
        callback: fn,
        dom: null
      }
    });

    act(() => {
      const content = result.current[1].render();
      content && render(content);
    });

    expect(document.body.children).toHaveLength(1);
  });

  it('Renders global component to body instead of root', () => {
    const fn = jest.fn();
    fn.mockReturnValue(<div>global component</div>);

    const { result } = renderHook((props) => usePortal(props.callback, props.dom), {
      initialProps: {
        callback: fn,
        dom: document.body
      }
    });

    act(() => {
      const content = result.current[1].render();
      content && render(content);
    });

    const com = screen.getByText('global component');
    expect(com.parentElement).toEqual(document.body);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});