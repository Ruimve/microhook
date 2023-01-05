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

Get `pending` state and resulting value via `useLoading`:
```tsx
import { useLoading } from 'nicehook';

function fetchData(keyword: string) {
  return new Promise<string>((resolve, reject) => {
    setTimeout(() => {
      resolve(keyword + ': data received')
    }, 2000)
  })
}

function Demo() {
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

Get the remaining height of the container and add a [ResizeObserver][resize-observer] via `useRestHeight`:

```tsx
import { useRef } from 'react';
import { useRestHeight } from 'nicehook';

function Demo() {
  const container = useRef<any>();
  const box1 = useRef<any>();
  const box2 = useRef<any>();

  const [resetHeight] = useRestHeight({
    container: { element: container, observer: true },
    children: [box2, {
      element: '.box1',
      observer: true
    }],
    offsets: [1, 2, 3, 4]
  });

  return (
    <div>
      <div className="App" ref={container}>
        <div className='box1' ref={box1}>
          <textarea name="" id="" cols={30} rows={10}></textarea>
        </div>
        <div className='box2' ref={box2}></div>
        {resetHeight}
      </div>
    </div>
  );
}
```

## useBus

Sometimes it is difficult to pass events between peer Components, we can create a bus via `useBus` to complete it easily and it's returned object will persist for the full lifetime of the component.

```tsx
interface Props {
  bus: Bus;
}

function Iuput(props: Props) {
  const { bus } = props;
  const ref = useRef<any>();
  useEffect(() => {
    bus.on('focus', (value: string) => {
      ref.current?.focus();
    });
    bus.on('change', (value: string) => {
      if(ref.current) {
        ref.current.value = value;
      }
    });
  }, [ref]);
  return (
    <div>
      <input type="text" ref={ref} />
    </div>
  )
}

function Button(props: Props) {
  const { bus } = props;
  return (
    <div>
      <button onClick={() => bus.emit('focus')}>emit focus</button>
      <button onClick={() => bus.emit('change', 'success')}>emit change</button>
    </div>
  )
}

function Demo() {
  const bus = useBus();
  const [visible, setVisible] = useState<boolean>(true);

  return (
    <div>
      {visible && (
        <div>
          <Iuput bus={bus} />
          <Button bus={bus} />
        </div>
      )}

      <button onClick={() => bus.off('change')}>清除 change 事件</button>
      <button onClick={() => bus.destory()}>清除所有事件</button>
      <button onClick={() => setVisible(!visible)}>重新渲染</button>
    </div>
  )
}
export default Demo;
```


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