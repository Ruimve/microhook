<div align="center">
  <h1>Nicehook</h1>

  <a href="https://github.com/robot12580">
    <img
      width="80"
      alt="robot12580"
      src="./material/dog2.png"
    />
  </a>

  <p>Simple and reusable Hooks。</p>
</div>
<hr />
<!-- prettier-ignore-start -->

![Build Status][build-badge]
![coverage][coverage-badge]

## Table of Contents

- [Introducing Hooks](#introducing-hooks)
- [Installation](#installation)
- [Hooks](#hooks)
  - [useLoading](#useloading)
  - [useRestHeight](#userestheight)

## Introducing Hooks

[Hooks][hooks] are a new addition in React 16.8. They let you use state and other React features without writing a class.
Building your own Hooks lets you extract component logic into reusable functions.

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `devDependencies`:
```
npm install nicehook --save
```
or

for installation via [yarn][yarn]
```
yarn add nicehook
```


## Hooks

### useLoading

A promise represents a single asynchronous operation that hasn’t been completed yet, but is expected in the future. There are three states of promises, pending, fulfilled and rejected.

Get `pending` state and resulting value via `useLoading`.
```tsx
import React from 'react';

function fetchData(keyword: string) {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve(keyword + ': data received')
    }, 2000)
  })
}

function Example() {
  const [result, requestData] = useLoading<string>(fetchData);

  const handleClick = () => {
    requestData('1')
  }

  return <div>
    <button onClick={handleClick}>start fetch</button>
    <div>
      {
        result.loading ? 'loading' : result.data
      }
    </div>
  </div>
}

```


### useRestHeight



[npm]: https://www.npmjs.com/
[yarn]: https://classic.yarnpkg.com
[node]: https://nodejs.org
[build-badge]: https://github.com/robot12580/nicehook/actions/workflows/ci.yml/badge.svg
[coverage]: https://coveralls.io/repos/github/robot12580/nicehook/badge.svg?branch=master
[coverage-badge]: https://coveralls.io/repos/github/robot12580/nicehook/badge.svg?branch=master
[hooks]: https://react.docschina.org/docs/hooks-custom.html
