import { useRef } from 'react';
import { useRestHeight } from '../index';
/**
 * @input  
 * import { useRestHeight } from 'microhook';
 */

function Demo() {
  const container = useRef<HTMLDivElement>(null);
  const box1 = useRef<HTMLDivElement>(null);
  const box2 = useRef<HTMLDivElement>(null);

  const [resetHeight] = useRestHeight(
    { element: container, observer: true },
    [box2, {
      element: '.box1',
      observer: true
    }],
    [1, 2, 3, 4]
  );

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