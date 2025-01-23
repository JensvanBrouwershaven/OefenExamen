import { useState } from 'react';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [message, setMessage] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setImageName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage('Please select an image');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', imageName);

    try {
      const response = await fetch('http://localhost:4000/api/Images', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Image uploaded successfully');
        console.log('Uploaded image:', data.image);
      } else {
        const errorData = await response.json();
        setMessage('Failed to upload image');
        console.error('Error:', errorData);
      }
    } catch (err) {
      setMessage('Error uploading image');
      console.error('Error:', err);
    }
  };

  return (
    <div className="upload-image">
      <h1>Upload Image</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Select Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div>
          <label htmlFor="name">Image Name (Optional):</label>
          <input
            type="text"
            id="name"
            name="name"
            value={imageName}
            onChange={handleNameChange}
            placeholder="Enter image name"
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadImage;
