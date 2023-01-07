import { useBoolean } from '../index';

function Demo() {
  const [value, toggle] = useBoolean(false);

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
