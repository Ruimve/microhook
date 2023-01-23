import { useState } from 'react';
import { useTimeout } from '../index';
/** 
 * @input
 * import { useTimeout } from 'nicehook';
 */

function Demo() {
  const [visible, setVisible] = useState(false);

  const [, { on, off }] = useTimeout(() => {
    console.log('定时器执行');
  }, 2000);

  return (
    <div>
      {String(visible)}
      <div>
        <button onClick={() => { on() }}>开始定时器</button>
        <button onClick={() => { off() }}>终止定时器</button>
        <button onClick={() => {
          // 点击后, 会导致函数重新执行, 但是定时器不会重新生成, 通过 off 仍能获得之前的 timer
          setVisible(!visible);
        }}>
          change visible
        </button>
      </div>
    </div>
  )
}

export {
  Demo
}