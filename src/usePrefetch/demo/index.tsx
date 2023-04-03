import { usePrefetch } from '../index';

/**
 * @input  
 * import { usePrefetch } from 'microhook';
 */

const images = [
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150/0000FF/808080',
  'https://via.placeholder.com/150/FF0000/FFFFFF',
];

function App() {
  usePrefetch(images, { type: 'image' });

  return (
    <div>
      <h1>Image Gallery</h1>
      {images.map((image, index) => (
        <img key={index} src={image} alt={`${index}`} />
      ))}
    </div>
  );
}

export default App;