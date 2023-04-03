export type ResourceType = 'image' | 'script' | 'link' | 'audio' | 'video';

export type Resource = HTMLImageElement | HTMLScriptElement | HTMLLinkElement | HTMLAudioElement | HTMLVideoElement;

function isHTMLLinkElement(element: Resource): element is HTMLLinkElement {
  return element instanceof HTMLLinkElement;
}

function createResource(url: string, type: ResourceType, crossOrigin?: 'anonymous' | 'use-credentials'): Resource {
  switch (type) {
    case 'image': {
      const img = new Image();
      img.src = url;
      if (crossOrigin) {
        img.crossOrigin = crossOrigin;
      }
      return img;
    }
    case 'script': {
      const script = document.createElement('script');
      script.src = url;
      if (crossOrigin) {
        script.crossOrigin = crossOrigin;
      }
      document.body.append(script);
      return script;
    }
    case 'link': {
      const link = document.createElement('link');
      link.href = url;
      link.rel = 'stylesheet';
      if (crossOrigin) {
        link.crossOrigin = crossOrigin;
      }
      document.head.append(link);
      return link;
    }
    case 'audio': {
      const audio = new Audio();
      audio.src = url;
      if (crossOrigin) {
        audio.crossOrigin = crossOrigin;
      }
      return audio;
    }
    case 'video': {
      const video = document.createElement('video');
      video.src = url;
      if (crossOrigin) {
        video.crossOrigin = crossOrigin;
      }
      return video;
    }
    default:
      throw new Error(`Invalid resource type: ${type}`);
  }
}

export {
  createResource,
  isHTMLLinkElement
}