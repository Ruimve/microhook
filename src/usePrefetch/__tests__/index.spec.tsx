import { renderHook, act } from '@testing-library/react';
import { usePrefetch } from '../index';

describe('Test usePrefetch', () => {
  it('should prefetch resources when the component mounts', async () => {
    const urls = ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'];
    const prefetchSpy = jest.spyOn(window.HTMLImageElement.prototype, 'src', 'set');

    renderHook(() => usePrefetch(urls));

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
    });

    expect(prefetchSpy).toHaveBeenCalledTimes(2);
    expect(prefetchSpy).toHaveBeenCalledWith(urls[0]);
    expect(prefetchSpy).toHaveBeenCalledWith(urls[1]);

    prefetchSpy.mockRestore();
  });
});

describe('Test usePrefetch with mock Image', () => {
  let createImageSpy: jest.SpyInstance;
  let addEventListener: jest.Mock<any, any>;
  let removeEventListener: jest.Mock<any, any>;

  beforeEach(() => {
    addEventListener = jest.fn();
    removeEventListener = jest.fn();
    createImageSpy = jest.spyOn(global, 'Image').mockImplementation(() => ({
      addEventListener,
      removeEventListener,
      src: '',
      crossOrigin: '',
    }) as any);
  });

  afterEach(() => {
    createImageSpy.mockRestore();
    addEventListener.mockClear();
    removeEventListener.mockClear()
  });

  it('should load image correctly', () => {
    const urls = ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'];
    renderHook(() => usePrefetch(urls));
    addEventListener.mock.calls[2][1]();
    expect(addEventListener).toHaveBeenCalledTimes(4);
  });

  it('should load image error', () => {
    const urls = ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'];
    renderHook(() => usePrefetch(urls));
    addEventListener.mock.calls[3][1]();
    addEventListener.mock.calls[3][1]();
    addEventListener.mock.calls[3][1]();
    expect(addEventListener).toHaveBeenCalledTimes(4);
  });
});

describe('Test usePrefetch hit cache', () => {
  let createImageSpy: jest.SpyInstance;
  let addEventListener: jest.Mock<any, any>;
  let removeEventListener: jest.Mock<any, any>;

  beforeEach(() => {
    addEventListener = jest.fn();
    removeEventListener = jest.fn();
    createImageSpy = jest.spyOn(global, 'Image').mockImplementation(() => ({
      addEventListener,
      removeEventListener,
      src: '',
      crossOrigin: '',
    }) as any);
  });

  it('should hit cache', () => {
    const urls = ['https://example.com/image1.jpg', 'https://example.com/image1.jpg'];
    const { rerender } = renderHook(() => usePrefetch(urls));
    addEventListener.mock.calls[2][1]();
    rerender();
    expect(addEventListener).toHaveBeenCalledTimes(4);
  });

  afterEach(() => {
    createImageSpy.mockRestore();
    addEventListener.mockClear();
    removeEventListener.mockClear()
  });
});

describe('Test usePrefetch link', () => {
  it('should load link', () => {
    const addEventListenerSpy = jest.spyOn(HTMLLinkElement.prototype, 'addEventListener') as any;

    const url = 'https://example.com/image1.jpg';
    renderHook(() => usePrefetch(url, { type: 'link' }));
    
    addEventListenerSpy.mock.calls[1][1]?.();
    addEventListenerSpy.mock.calls[1][1]?.();
    addEventListenerSpy.mock.calls[1][1]?.();
    addEventListenerSpy.mock.calls[0][1]?.();
    addEventListenerSpy.mock.calls[1][1]?.();

    expect(addEventListenerSpy).toHaveBeenCalledTimes(2);

  });
});