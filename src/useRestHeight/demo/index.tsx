import React, { useRef } from 'react';
import { useRestHeight } from '../index';

/**
 * @input  
 * import { useRestHeight } from 'microhook';
 */

function Demo() {
  const parentRef = useRef<HTMLDivElement>(null);
  const child1Ref = useRef<HTMLDivElement>(null);
  const child2Ref = useRef<HTMLDivElement>(null);

  const [resetHeight] = useRestHeight(
    parentRef,
    [child1Ref, '.child2'],
    [1, 2, 3, 4]
  );

  return (
    <div>
      <div className="App" ref={parentRef}>
        <div className="child1" ref={child1Ref}>
          <textarea name="" id="" cols={30} rows={10}></textarea>
        </div>
        <div className="child2" ref={child2Ref}></div>
        {resetHeight}
      </div>
    </div>
  );
}

export {
  Demo
}