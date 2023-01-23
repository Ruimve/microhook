import { useBoolean } from '../index';
/**
 * @input 
 * import { useBoolean } from 'nicehook';
 */


function Demo() {
  const [value, actions] = useBoolean(false);
  const { toggle } = actions;

  return (
    <div>
      布尔值: {String(value)}
      <div>
        <button onClick={() => toggle(true)}>设置为 true</button>
        <button onClick={() => toggle(false)}>设置为 false</button>
        <button onClick={() => toggle()}>切换</button>
      </div>
    </div>
  );
}
export { Demo };
