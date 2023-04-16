<div align="center">
  <h1>Microhook</h1>

  <a href="https://github.com/Ruimve">
    <img
      width="80"
      alt="Ruimve"
      src="https://github.com/Ruimve/materials/blob/main/images/windmill.png?raw=true"
    />
  </a>

  <p>🔥🔥 Check out microhook!<br /> 🚀 It's a lightweight library that makes it easy to use React hooks in your code. 💻</p>
</div>
<hr />

[![Build Status][build-badge]][build]
[![Code Coverage][coverage-badge]][coverage]
[![version][version-badge]][package]
[![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]
[![PRs Welcome][prs-badge]][prs]

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]

## Table of Contents

- [Introducing Hooks](#introducing-hooks)
- [Installation](#installation)
- [State](#state)
  - [useLoading](#useloading-simplify-your-async-requests)
- [Side-effects](#side-effects)
  - [usePrefetch](#useprefetch-efficiently-prefetches-external-resources)
- [Interaction](#layout)
  - [useRestHeight](#userestheight-calculate-remaining-height-dynamically)
  - [useIntersectionObserver](#useintersectionobserver-track-element-visibility-changes)
- [DOM](#dom)
  - [usePortal](#useportal-teleport-your-react-components-anywhere)
  - [useMeasure](#usemeasure-track-element-measurements-with-ease)

## Introducing Hooks

**`Microhook`** is a lightweight React Hooks library that aims to provide some excellent custom Hooks to help developers improve development efficiency and code quality. 💪

**`Microhook's`** main features include:

👉 **Simplicity and ease of use**: The usage of each Hook is very simple and easy to understand, and the amount of code is very small.

🚀 **High efficiency and practicality**: Each Hook provided by **`Microhook`** is very practical and can be directly applied to projects, helping developers quickly solve some common problems.

💯 **Stable quality**: **`Microhook`** has been fully tested and validated, and the code quality is guaranteed, so you can use it with confidence.

Microhook currently provides multiple Hooks, such as **`useLoading`**, **`usePortal`**, **`useRestHeight`**, etc. These Hooks can help you optimize your React projects, improve page performance and interaction experience. If you want to speed up your React development and improve your code quality, **`Microhook`** is definitely worth a try. 😎

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:
```
npm install microhook --save
```
or

for installation via [yarn][yarn]:
```
yarn add microhook
```


## State

### useLoading: Simplify Your Async Requests!

👋 Hey there! Let me introduce you to **`useLoading`** -- a custom React hook that makes handling the loading state of an API request or Promise a breeze. 🌬️

💻 By utilizing **`useLoading`**, you can easily implement an elegant solution to handle asynchronous requests in your React application. With just a few lines of code, you can keep track of loading status and display a spinner or loading message to keep your users informed of the ongoing process. 🚀

🤔 Still not sure how it works? Let's break it down:

* A function that takes any number of arguments and returns a Promise.
* An optional array of arguments.
* An optional error type.

🎉 The return value of **`useLoading`** is a tuple, containing two items:

An object with two properties, **`loading`** and **`data`**. **`loading`** is a boolean that indicates whether the request is currently being processed or not. **`data`** is an object containing the response data from the request.

An object with a single property, **`wrapRequest`**, which is an asynchronous function that wraps the original request and handles the loading state.

💡 Here's a quick example of how to use **`useLoading`** in your code:

```tsx
import { useLoading } from 'microhook';

async function fetchSomeData(arg1: string, arg2: number): Promise<{ message: string }> {
  // fetch data here...
}

function MyComponent() {
  const [response, { wrapRequset }] = useLoading(fetchSomeData);

  useEffect(() => {
    wrapRequset('some argument', 123);
  }, []);

  if (response.loading) {
    return <Spinner />;
  }

  return <div>{response.data?.message}</div>;
}
```

🎓 As you can see, **`useLoading`** simplifies handling the loading state and error handling of an API request or Promise, allowing you to focus on the core functionality of your application. Give it a try and let me know what you think! 🤩 [For more information!][use-loading-demo]

## Side-effects

### usePrefetch: Efficiently Prefetches External Resources!

👋 Hi there! Let me introduce you to **`usePrefetch`**, a React hook for prefetching resources like images, scripts, and stylesheets.

🤔 Why is it useful? By preloading resources, **`usePrefetch`** can improve perceived performance and reduce the likelihood of visible loading spinners or other loading indicators. This can make the app feel more responsive and improve the user experience.

To use it, first import it from your React component:

```tsx
import { usePrefetch } from 'microhook';
```

Then, call the hook with an array of URLs and an optional options object:

```tsx
const urls = ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'];
const options = { type: 'link' };
usePrefetch(urls, options);
```

This will asynchronously fetch the resources and cache them for later use, improving your website's performance. 🏎️  [For more information!][use-prefetch-demo]

## Interaction

### useRestHeight: Calculate Remaining Height Dynamically!

👋 Hey there! Let me introduce you to **`useRestHeight`**, a React hook that calculates the remaining height of a container after subtracting the height of its child elements and any specified offsets.

🚀 This hook is perfect when you want to dynamically adjust the layout of a container based on its available height.

👉 To use this hook, simply import it from the corresponding module and call it inside a functional component with three arguments:

* **`parent`**: A string or a React ref object that refers to the container element whose height you want to calculate.
* **`children`**: An array of strings or React ref objects that refer to the child elements whose heights you want to subtract from the parent height.
* **`offsets`**: An array of numbers that specify any additional height offsets that you want to subtract from the parent height.

🎉 The hook returns an array with two elements:

* **`restHeight`**: The remaining height of the container after subtracting the child elements and offsets.
* **`action`**: An object with a single function recalculateHeight that you can call to recalculate the container height when needed.

💡 Overall, **`useRestHeight`** simplifies the process of dynamically adjusting the layout of container elements in your React applications. Want to see a demo? [Check it out!][use-rest-height-demo]

### useIntersectionObserver: Track element visibility changes.

This hook allows you to detect when an element becomes visible in the viewport. You can use it to implement lazy-loading, infinite scrolling, or any other functionality that requires you to track an element's visibility.

To use it, you simply need to pass a RefObject to the element you want to observe, along with any optional configuration options like the root element, root margin, and threshold. The hook returns a tuple containing the IntersectionObserverEntry for the observed element, and an empty object that you can use to dispatch any actions.

So, if you want to make your web app more performant and user-friendly, give useIntersectionObserver a try! 👍[Demo is here][use-intersection-observer-demo]

## DOM

### usePortal: Teleport Your React Components Anywhere!

🚀 **`usePortal`** is a React hook that allows you to easily render content outside of the component hierarchy. Simply pass in a render function and a container, and **`usePortal`**  will take care of the rest. It's perfect for creating modals, tooltips, and other UI elements that need to be rendered outside of the main content area.

Here's an example of how to use it:

```tsx
import { usePortal } from 'microhook';

function MyModal() {
  const { render } = usePortal(() => (
    <div className="modal">
      <h2>Modal title</h2>
      <p>Modal content goes here...</p>
    </div>
  ), document.body);

  return render();
}
```

👉 Make sure to wrap the render function in **`useCallback`** and memoize your component with **`React.memo`** for optimal performance. [For more information!][use-portal-demo]

### useMeasure: Track Element Measurements With Ease!

To use the **`useMeasure`** hook, first import it into your component with the following code:

```tsx
import { useMeasure } from 'microhook';
```

Then, declare a ref for the element you want to measure with the **`useRef`** hook:

```tsx
const ref = useRef(null);
```

Finally, call the **`useMeasure`** hook with the ref as an argument, and destructure the **`measure`** object from the returned value:

```tsx
const [measure] = useMeasure(ref);
```

You can now access the measurements of the element in your component with **`measure.width`**, **`measure.height`**, **`measure.top`**, **`measure.right`**,**`measure.bottom`**, **`measure.left`**, **`measure.x`**, and **`measure.y`**. Whenever the size or position of the element changes, the measure object will automatically update with the new values. [For more information!][use-measure-demo]


[npm]: https://www.npmjs.com/
[yarn]: https://classic.yarnpkg.com
[node]: https://nodejs.org
[portals]: https://reactjs.org/docs/portals.html#gatsby-focus-wrapper
[build-badge]:https://img.shields.io/github/workflow/status/microhook/validate?logo=github&style=flat-square
[build]: https://github.com/Ruimve/microhook/actions/workflows/ci.yml/badge.svg
[coverage-badge]: https://img.shields.io/codecov/c/github/Ruimve/microhook.svg?style=flat-square
[coverage]: https://codecov.io/github/microhook
[version-badge]: https://img.shields.io/npm/v/microhook.svg?style=flat-square
[package]: https://www.npmjs.com/package/microhook
[downloads-badge]: https://img.shields.io/npm/dm/microhook.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/microhook
[license-badge]: https://img.shields.io/npm/l/microhook.svg?style=flat-square
[license]: https://github.com/Ruimve/microhook/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[github-watch-badge]: https://img.shields.io/github/watchers/Ruimve/microhook.svg?style=social
[github-watch]: https://github.com/Ruimve/microhook/watchers
[github-star-badge]: https://img.shields.io/github/stars/Ruimve/microhook.svg?style=social
[github-star]: https://github.com/Ruimve/microhook/stargazers
[hooks]: https://react.docschina.org/docs/hooks-custom.html
[resize-observer]: https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver

[use-loading-demo]: https://github.com/Ruimve/microhook/blob/master/src/useLoading/demo/index.tsx
[use-rest-height-demo]: https://github.com/Ruimve/microhook/blob/master/src/useRestHeight/demo/index.tsx
[use-portal-demo]: https://github.com/Ruimve/microhook/blob/master/src/usePortal/demo/index.tsx
[use-prefetch-demo]: https://github.com/Ruimve/microhook/blob/master/src/usePrefetch/demo/index.tsx
[use-intersection-observer-demo]: https://github.com/Ruimve/microhook/blob/master/src/useIntersectionObserver/demo/index.tsx
[use-measure-demo]: https://github.com/Ruimve/microhook/blob/master/src/useMeasure/demo/index.tsx