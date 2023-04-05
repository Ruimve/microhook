import { useRef } from 'react';
import { useIntersectionObserver } from '../index';

function App() {
  const targetRef = useRef(null);
  const [entry] = useIntersectionObserver<HTMLDivElement>(targetRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  });

  return (
    <div style={{ height: 1000000 }}>
      <div
        ref={targetRef}
        style={{
          height: '500px',
          backgroundColor: 'lightgray',
        }}
      >
        {entry?.isIntersecting ? 'In view!' : 'Out of view'}
      </div>
    </div>
  );
}

export default App;


