import React, { useState, useCallback } from 'react';
import { usePortal } from '../index';
/** 
 * @input
 * import { usePortal } from 'microhook';
 */

function Node(props: { visible: boolean }) {
  const { visible } = props;
  console.log('rerender')
  return <div>
    show: {String(visible)}
  </div>
}
const MemoNode = React.memo(Node);

function Demo() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  /** 为了避免重复渲染, 请使用 useCallback 和 React.memo */
  const createExample = useCallback(() => <MemoNode visible={visible} />, [visible]);
  const [, { render }] = usePortal(
    createExample,
    document.body
  );
  return (
    <div className='portal-demo'>
      {String(visible)}\{String(loading)}
      {render()}
      <div>
        <button onClick={() => { setVisible(!visible) }}>
          change visible
        </button>
        <button onClick={() => { setLoading(!loading) }}>
          change loading
        </button>
      </div>
    </div>
  )
}

export {
  Demo
}