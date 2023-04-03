import { createResource, isHTMLLinkElement } from '../createResource';

describe('createResource', () => {
  test('should create an image resource with the correct url', () => {
    const url = 'https://example.com/image.jpg';
    const resource = createResource(url, 'image') as HTMLImageElement;
    expect(resource.nodeName).toBe('IMG');
    expect(resource.src).toBe(url);
  });

  test('should create an image resource with crossOrigin if provided', () => {
    const url = 'https://example.com/image.jpg';
    const crossOrigin = 'anonymous';
    const resource = createResource(url, 'image', crossOrigin) as HTMLImageElement;
    expect(resource.crossOrigin).toBe(crossOrigin);
  });

  test('should create a script resource with the correct url', () => {
    const url = 'https://example.com/script.js';
    const resource = createResource(url, 'script') as HTMLScriptElement;
    expect(resource.nodeName).toBe('SCRIPT');
    expect(resource.src).toBe(url);
  });

  test('should create a script resource with crossOrigin if provided', () => {
    const url = 'https://example.com/script.js';
    const crossOrigin = 'anonymous';
    const resource = createResource(url, 'script', crossOrigin) as HTMLScriptElement;
    expect(resource.crossOrigin).toBe(crossOrigin);
  });

  test('should create a link resource with the correct url', () => {
    const url = 'https://example.com/style.css';
    const resource = createResource(url, 'link') as HTMLLinkElement;
    expect(resource.nodeName).toBe('LINK');
    expect(resource.href).toBe(url);
    expect(resource.rel).toBe('stylesheet');
  });

  test('should create a link resource with crossOrigin if provided', () => {
    const url = 'https://example.com/style.css';
    const crossOrigin = 'use-credentials';
    const resource = createResource(url, 'link', crossOrigin) as HTMLLinkElement;
    expect(resource.crossOrigin).toBe(crossOrigin);
  });

  test('should create an audio resource with the correct url', () => {
    const url = 'https://example.com/audio.mp3';
    const resource = createResource(url, 'audio') as HTMLAudioElement;
    expect(resource.nodeName).toBe('AUDIO');
    expect(resource.src).toBe(url);
  });

  test('should create an audio resource with crossOrigin if provided', () => {
    const url = 'https://example.com/audio.mp3';
    const crossOrigin = 'anonymous';
    const resource = createResource(url, 'audio', crossOrigin) as HTMLAudioElement;
    expect(resource.crossOrigin).toBe(crossOrigin);
  });

  test('should create a video resource with the correct url', () => {
    const url = 'https://example.com/video.mp4';
    const resource = createResource(url, 'video') as HTMLVideoElement;
    expect(resource.nodeName).toBe('VIDEO');
    expect(resource.src).toBe(url);
  });

  test('should create a video resource with crossOrigin if provided', () => {
    const url = 'https://example.com/video.mp4';
    const crossOrigin = 'use-credentials';
    const resource = createResource(url, 'video', crossOrigin) as HTMLVideoElement;
    expect(resource.crossOrigin).toBe(crossOrigin);
  });

  test('should throw an error for an invalid resource type', () => {
    const url = 'https://example.com/file';
    expect(() => createResource(url, 'invalid' as any)).toThrow('Invalid resource type');
  });
});

describe('isHTMLLinkElement', () => {
  it('should return true for a HTMLLinkElement', () => {
    const link = document.createElement('link');
    const result = isHTMLLinkElement(link);
    expect(result).toBe(true);
  });

  it('should return false for a HTMLImageElement', () => {
    const img = new Image();
    const result = isHTMLLinkElement(img);
    expect(result).toBe(false);
  });

  it('should return false for a HTMLScriptElement', () => {
    const script = document.createElement('script');
    const result = isHTMLLinkElement(script);
    expect(result).toBe(false);
  });

  it('should return false for a HTMLAudioElement', () => {
    const audio = new Audio();
    const result = isHTMLLinkElement(audio);
    expect(result).toBe(false);
  });

  it('should return false for a HTMLVideoElement', () => {
    const video = document.createElement('video');
    const result = isHTMLLinkElement(video);
    expect(result).toBe(false);
  });
});





