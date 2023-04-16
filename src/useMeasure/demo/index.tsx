import { useRef } from 'react';
import { useMeasure } from '../index';

function Demo() {
  const ref = useRef<HTMLDivElement>(null);
  const [size] = useMeasure(ref);

  return (
    <div ref={ref} style={{ background: 'blue' }}>
      {size.width},{size.height},{size.top},{size.right},{size.bottom},{size.left},{size.x},{size.y}
      <textarea></textarea>
    </div>
  )
}

export default Demo;