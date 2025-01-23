import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import UploadImage from './pages/UploadImage';

function App() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/Images');
        const data = await response.json();
        setImages(data.images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home images={images} />} />
            <Route path="/Upload" element={<UploadImage setImages={setImages} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
