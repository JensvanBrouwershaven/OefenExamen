import { useState, useEffect } from 'react';

const Home = ({ images }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredImages, setFilteredImages] = useState(images);

  // Filter images based on the search term
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    // If the search term is empty, show all images
    if (term === '') {
      setFilteredImages(images);
    } else {
      // Filter the images based on the name (case insensitive)
      const filtered = images.filter((image) =>
        image.name.toLowerCase().includes(term)
      );
      setFilteredImages(filtered);
    }
  };

  useEffect(() => {
    // Update filteredImages when images are passed or updated
    setFilteredImages(images);
  }, [images]);

  return (
    <div className="home">
      <div className="search">
        <input
          type="text"
          placeholder="Search images..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="images">
        {filteredImages.length > 0 ? (
          filteredImages.map((image) => (
            <div key={image._id}>
              <p>{image.name}</p>
              <img src={`http://localhost:4000/${image.imageUrl}`} alt={image.name} />
            </div>
          ))
        ) : (
          <p>No images found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
