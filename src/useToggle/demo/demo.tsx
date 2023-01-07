import { useToggle } from '../index';
/**
 * 安装包之后替换成 
 * import { useToggle } from 'nicehook';
 */


function Demo() {
  const firstHost = { name: '小明' };
  const secondHost = { name: '小花' };
  const [value, { setLeft, setRight, toggle }] = useToggle(firstHost, secondHost);

  return (
    <div>
      主持人: {value.name}
      <div>
        <button onClick={() => setLeft()}>设置为左</button>
        <button onClick={() => setRight()}>设置为右</button>
        <button onClick={() => toggle()}>切换</button>
      </div>
    </div>
  );
}
export { Demo };
