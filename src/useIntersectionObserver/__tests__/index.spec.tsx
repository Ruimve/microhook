import { renderHook, act } from '@testing-library/react';
import { IntersectionObserver as MockApi } from '../../../__mocks__/IntersectionObserver';
import { useIntersectionObserver } from '../index';

describe('useIntersectionObserver', () => {
  beforeAll(() => {
    window.IntersectionObserver = MockApi as unknown as typeof IntersectionObserver;
  })
  it('should set the intersectionObserverEntry to null when the ref is null', () => {
    const ref = { current: null };
    const { result } = renderHook(() =>
      useIntersectionObserver(ref, {
        rootMargin: '0px',
        threshold: 0,
      })
    );
    const [intersectionObserverEntry] = result.current;
    expect(intersectionObserverEntry).toBeNull();
  });

  it('should set the intersectionObserverEntry to null when the entry is not intersecting', () => {
    const ref = { current: document.createElement('div') };
    const { result } = renderHook(() =>
      useIntersectionObserver(ref, {})
    );
    const [intersectionObserverEntry] = result.current;
    expect(intersectionObserverEntry).toBeNull();
  });

  it('should set the intersectionObserverEntry to a non-null value when the entry is intersecting', () => {
    const getBoundingClientRect = jest.fn()
      .mockReturnValue({
        top: 0,
        left: 0,
        bottom: 100,
        right: 100,
        width: 100,
        height: 100
      });
    HTMLElement.prototype.getBoundingClientRect = getBoundingClientRect;
    const ref = { current: document.createElement('div') };
    jest.useFakeTimers();
    const { result } = renderHook(() =>
      useIntersectionObserver(ref, {
        rootMargin: '0px',
        threshold: 0,
      })
    );
    act(() => {
      jest.runAllTimers()
    });

    jest.useFakeTimers();
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      const [intersectionObserverEntry] = result.current;
      expect(intersectionObserverEntry).toEqual(entry);
    });
    observer.observe(ref.current);
    act(() => {
      jest.runAllTimers()
    });

  });
});