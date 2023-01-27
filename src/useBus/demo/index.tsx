import { useEffect, useRef, useState } from 'react';
import { useBus, Bus } from '../index';
/**
 * @input 
 * import { useBus } from 'microhook';
 * import { Bus } from 'microhook/types/useBus';
 */

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
      if (ref.current) {
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
  const [bus] = useBus();
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

export {
  Demo
}