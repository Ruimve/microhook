class IntersectionObserver {
  options;
  callback;
  observerId;

  constructor(callback, options) {
    this.callback = callback;
    this.options = options || {};

    this.observerId = setTimeout(() => {
      this.callback([{
        isIntersecting: true,
        intersectionRatio: 1,
        target: document.createElement('div'),
        boundingClientRect: {},
        intersectionRect: {},
        rootBounds: {},
      }]);
    }, 1000);
  }

  disconnect() {
    clearInterval(this.observerId);
  }

  observe() { }
  unobserve() { }
}

export {
  IntersectionObserver
}