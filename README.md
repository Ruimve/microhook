<div align="center">
  <h1>Nicehook</h1>

  <a href="https://github.com/robot12580">
    <img
      width="80"
      alt="robot12580"
      src="https://github.com/robot12580/materials/blob/main/images/dog2.png?raw=true"
    />
  </a>

  <p>Simple and reusable Hooks。</p>
</div>
<hr />
<!-- prettier-ignore-start -->

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
- [Hooks](#hooks)
  - [useLoading](#useloading)
  - [useRestHeight](#userestheight)
  - [useBus](#usebus)
  - [useToggle](#usetoggle)
  - [useBoolean](#useboolean)
  - [usePortal](#useportal)

## Introducing Hooks

[Hooks][hooks] are a new addition in React 16.8. They let you use state and other React features without writing a class.
Building your own Hooks lets you extract component logic into reusable functions.

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `dependencies`:
```
npm install nicehook --save
```
or

for installation via [yarn][yarn]:
```
yarn add nicehook
```


## Hooks

### useLoading

A promise represents a single asynchronous operation that hasn’t been completed yet, but is expected in the future. There are three states of promises, pending, fulfilled and rejected.

Get `pending` state and resulting value via `useLoading`.

[View demo][use-loading-demo]

### useRestHeight

Get the remaining height of the container and add a [ResizeObserver][resize-observer] via `useRestHeight`.

[View demo][use-rest-height-demo]

## useBus

Sometimes it is difficult to pass events between peer Components, we can create a bus via `useBus` to complete it easily and it's returned object will persist for the full lifetime of the component.

[View demo][use-bus-demo]

## useToggle

A short handle that alternates between two states. 

[View demo][use-toggle-demo]

## useBoolean

Alternate `true` and `false` value based on useToggle.

[View demo][use-boolean-demo]

## usePortal

[Portals][portals] provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
`usePortal` will return a memoized version of the component that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized components that rely on reference equality to prevent unnecessary renders.

[View demo][use-portal-demo]

[npm]: https://www.npmjs.com/
[yarn]: https://classic.yarnpkg.com
[node]: https://nodejs.org
[build-badge]:https://img.shields.io/github/workflow/status/nicehook/validate?logo=github&style=flat-square
[build]: https://github.com/robot12580/nicehook/actions/workflows/ci.yml/badge.svg
[coverage-badge]: https://img.shields.io/codecov/c/github/robot12580/nicehook.svg?style=flat-square
[coverage]: https://codecov.io/github/nicehook
[version-badge]: https://img.shields.io/npm/v/nicehook.svg?style=flat-square
[package]: https://www.npmjs.com/package/nicehook
[downloads-badge]: https://img.shields.io/npm/dm/nicehook.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/nicehook
[license-badge]: https://img.shields.io/npm/l/nicehook.svg?style=flat-square
[license]: https://github.com/robot12580/nicehook/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[github-watch-badge]: https://img.shields.io/github/watchers/robot12580/nicehook.svg?style=social
[github-watch]: https://github.com/robot12580/nicehook/watchers
[github-star-badge]: https://img.shields.io/github/stars/robot12580/nicehook.svg?style=social
[github-star]: https://github.com/robot12580/nicehook/stargazers
[hooks]: https://react.docschina.org/docs/hooks-custom.html
[resize-observer]: https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver

[use-loading-demo]: https://github.com/robot12580/nicehook/blob/master/src/useLoading/demo/demo.tsx
[use-rest-height-demo]: https://github.com/robot12580/nicehook/blob/master/src/useRestHeight/demo/demo.tsx
[use-bus-demo]: https://github.com/robot12580/nicehook/blob/master/src/useBus/demo/demo.tsx
[use-toggle-demo]: https://github.com/robot12580/nicehook/blob/master/src/useToggle/demo/demo.tsx
[use-boolean-demo]: https://github.com/robot12580/nicehook/blob/master/src/useBoolean/demo/demo.tsx
[use-portal-demo]: https://github.com/robot12580/nicehook/blob/master/src/usePortal/demo/demo.tsx
[portals]: https://reactjs.org/docs/portals.html#gatsby-focus-wrapper