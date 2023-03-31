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

  /** To avoid re-render, please use useCallback and React.memo */
  const createExample = useCallback(() => <MemoNode visible={visible} />, [visible]);
  const [, { render }] = usePortal(
    createExample,
    document.body
  );
  return (
    <div className='portal-demo'>
      {String(visible)}\{String(loading)}
      {render() || null}
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