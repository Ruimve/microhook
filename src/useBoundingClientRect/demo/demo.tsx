import { useRef, useState } from 'react';
import { useBoundingClientRect } from '../index';

function Demo() {
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  // 通过 ref 获取元素, 可以将 visible 添加为依赖项
  const rect1 = useBoundingClientRect(ref, { observer: true }, [visible]);

  // 通过 getElementsByClassName 获取元素, 如果不添加依赖项，dom 删除有可能导致监听失败
  const rect2 = useBoundingClientRect(document.getElementsByClassName('textarea2')?.[0], { observer: true });

  return (
    <div>
      {visible && <div>
        {`top:${rect1?.top},right:${rect1?.right},bottom:${rect1?.bottom},left:${rect1?.left},height:${rect1?.height},width:${rect1?.width},x:${rect1?.x},y:${rect1?.y}`}
        {`top:${rect2?.top},right:${rect2?.right},bottom:${rect2?.bottom},left:${rect2?.left},height:${rect2?.height},width:${rect2?.width},x:${rect2?.x},y:${rect2?.y}`}
        <div className='textarea1' ref={ref}>
          <textarea />
        </div>
        <div className='textarea2'>
          <textarea />
        </div>
      </div>}

      <button onClick={() => setVisible(!visible)}>渲染</button>
    </div>
  )
}

export {
  Demo
}