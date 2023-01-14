import { useRef } from 'react';
import { useRestHeight } from '../index';
/**
 * @input 
 * import { useRestHeight } from 'nicehook';
 */

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

export {
  Demo
}