import { useOutClick } from '../';
function Demo() {
  const [ref] = useOutClick<HTMLDivElement>(() => {
    alert('click outter');
  });
  return <div style={{ width: 100, height: 100, background: 'red' }}>
    <div style={{ width: 50, height: 50, background: 'black' }} ref={ref}>inner</div>
    outter
  </div>
}

export default Demo;