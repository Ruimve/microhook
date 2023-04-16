import { render, renderHook, fireEvent } from '@testing-library/react';
import { useOutClick } from '../';

describe('Test useOutClick', () => {
  it('handler is called when clicking outside of the element', () => {
    const handler = jest.fn();
    const TestComponent = () => {
      const [ref] = useOutClick<HTMLDivElement>(handler);
      return (
        <div>
          <div ref={ref}>Inside element</div>
          Outside element
        </div>
      );
    };

    const { getByText } = render(<TestComponent />);
    fireEvent.mouseDown(getByText('Outside element'));

    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('handler is not called when clicking inside of the element', () => {
    const handler = jest.fn();
    const TestComponent = () => {
      const [ref] = useOutClick<HTMLDivElement>(handler);
      return (
        <div>
          <div ref={ref}>Inside element</div>
          Outside element
        </div>
      );
    };

    const { getByText } = render(<TestComponent />);
    fireEvent.mouseDown(getByText('Inside element'));

    expect(handler).not.toHaveBeenCalled();
  });
});