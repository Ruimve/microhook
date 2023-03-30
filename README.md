<div align="center">
  <h1>Microhook</h1>

  <a href="https://github.com/Ruimve">
    <img
      width="80"
      alt="Ruimve"
      src="https://github.com/Ruimve/materials/blob/main/images/windmill.png?raw=true"
    />
  </a>

  <p>Micro and reusable Hooks.</p>
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
- [Async Hooks](#async-hooks)
  - [useLoading](#useloading)
- [State Hooks](#state-hooks)
  - [useBus](#usebus)
  - [useToggle](#usetoggle)
  - [useBoolean](#useboolean)
- [Layout Hooks](#layout-hooks)
  - [useRestHeight](#userestheight)
  - [useBoundingClientRect](#useboundingclientrect)
- [Render Hooks](#render-hooks)
  - [usePortal](#useportal)
- [Timer Hooks](#timer-hooks)
  - [useTimeout](#usetimeout)

## Introducing Hooks

[Hooks][hooks] are a new addition in React 16.8. They let you use state and other React features without writing a class.
Building your own Hooks lets you extract component logic into reusable functions.

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


## Async Hooks

### useLoading

👋 Hey there! Let me introduce you to \`**useLoading**\` -- a custom React hook that makes handling the loading state of an API request or Promise a breeze. 🌬️

💻 By utilizing \`**useLoading**\`, you can easily implement an elegant solution to handle asynchronous requests in your React application. With just a few lines of code, you can keep track of loading status and display a spinner or loading message to keep your users informed of the ongoing process. 🚀

🤔 Still not sure how it works? Let's break it down:

* A function that takes any number of arguments and returns a Promise.
* An optional array of arguments.
* An optional error type.

🎉 The return value of \`**useLoading**\` is a tuple, containing two items:

An object with two properties, \`**loading**\` and \`**data**\`. \`**loading**\` is a boolean that indicates whether the request is currently being processed or not. \`**data**\` is an object containing the response data from the request.

An object with a single property, \`**wrapRequest**\`, which is an asynchronous function that wraps the original request and handles the loading state.

💡 Here's a quick example of how to use \`**useLoading**\` in your code:

```tsx
import { useLoading } from './useLoading';

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

🎓 As you can see, \`**useLoading**\` simplifies handling the loading state and error handling of an API request or Promise, allowing you to focus on the core functionality of your application. Give it a try and let me know what you think! 🤩 [For more information.][use-loading-demo]

## State Hooks

## useBus

Sometimes it is difficult to pass events between peer Components, we can create a bus via `useBus` to complete it easily and it's returned object will persist for the full lifetime of the component.

#### Params

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`-`**|`{-}`|`-`|-|

#### Result
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`value`**|`{Bus}`|`-`|Bus instance.|
|**`action`**|`-`|`-`|-|

For more information [view demo][use-bus-demo].

## useToggle

A short handle that alternates between two states. 

#### Params

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`left`**|`{any}`|`-`|Left value.|
|**`right`**|`{any}`|`-`|Right value.|

#### Result
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`value`**|`{any}`|`-`|Left and right value.|
|**`action`**|`{{setLeft,setRight,toggle}}`|`-`|Function of changing value.|

For more information [view demo][use-toggle-demo].

## useBoolean

Alternate `true` and `false` value based on useToggle.

#### Params

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`initialValue`**|`{boolean}`|`-`|Boolean value.|

#### Result
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`value`**|`{boolean}`|`-`|Boolean value.|
|**`action`**|`{{toggle}}`|`-`|Function of changing boolean value.|

For more information [view demo][use-boolean-demo].

## Layout Hooks

### useRestHeight

👋 Hey there! Let me introduce you to \`**useRestHeight**\`, a React hook that calculates the remaining height of a container after subtracting the height of its child elements and any specified offsets.

🚀 This hook is perfect when you want to dynamically adjust the layout of a container based on its available height.

👉 To use this hook, simply import it from the corresponding module and call it inside a functional component with three arguments:

* \`**parent**\`: A string or a React ref object that refers to the container element whose height you want to calculate.
* \`**children**\`: An array of strings or React ref objects that refer to the child elements whose heights you want to subtract from the parent height.
* \`**offsets**\`: An array of numbers that specify any additional height offsets that you want to subtract from the parent height.

🎉 The hook returns an array with two elements:

* \`**restHeight**\`: The remaining height of the container after subtracting the child elements and offsets.
* \`**action**\`: An object with a single function recalculateHeight that you can call to recalculate the container height when needed.

💡 Overall, \`**useRestHeight**\` simplifies the process of dynamically adjusting the layout of container elements in your React applications. Want to see a demo? [Check it out!][use-rest-height-demo]

## useBoundingClientRect

Providing information about the size of an element and its position relative to the viewport and updating dom when size or position changes.

#### Params

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`element`**|`{RectElement}`|`-`|Element.|
|**`options`**|`{{observer: boolean}}`|`0`|Whether to enable monitoring.|
|**`deps`**|`{Array<any>}`|`0`|Rerender dependency list.|

#### Result
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`value`**|`{Rect}`|`-`|Size and Position information.|
|**`action`**|`{{updateRect}}`|`-`|Function of updating size and position information.|

For more information [view demo][use-bounding-client-rect].

## Render Hooks

### usePortal

[Portals][portals] provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

`usePortal` will return a memoized version of the component that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized components that rely on reference equality to prevent unnecessary renders.

#### Params

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`callback`**|`{() => React.ReactNode}`|`-`|A function that returns a React.ReactNode.|
|**`container`**|`{HTMLElement}`|`-`|DOM container.|

#### Result
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`value`**|`-`|`-`|-|
|**`action`**|`{{render}}`|`-`|Function of rendering dom.|

For more information [view demo][use-portal-demo].

## Timer Hooks

### useTimeout

Create an `timer` that can persist for the full lifetime of the component.

#### Params

|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`callback`**|`{() => void}`|`-`|A function that is executed when the time is up.|
|**`delay`**|`{number}`|`0`|Delay time.|

#### Result
|Name|Type|Default|Description|
|:--:|:--:|:-----:|:----------|
|**`value`**|`{NodeJS.Timeout}`|`-`|Timer.|
|**`action`**|`{{on,off}}`|`-`|Enable timer.|

For more information [view demo][use-timeout-demo].

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
[use-bus-demo]: https://github.com/Ruimve/microhook/blob/master/src/useBus/demo/index.tsx
[use-toggle-demo]: https://github.com/Ruimve/microhook/blob/master/src/useToggle/demo/index.tsx
[use-boolean-demo]: https://github.com/Ruimve/microhook/blob/master/src/useBoolean/demo/index.tsx
[use-portal-demo]: https://github.com/Ruimve/microhook/blob/master/src/usePortal/demo/index.tsx
[use-timeout-demo]: https://github.com/Ruimve/microhook/blob/master/src/useTimeout/demo/index.tsx
[use-bounding-client-rect]: https://github.com/Ruimve/microhook/blob/master/src/useBoundingClientRect/demo/index.tsx