import { useState } from 'react';
import '../index.css';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);
  const [isFileSelected, setIsFileSelected] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setIsFileSelected(!!file);  // Update visibility state based on file selection
    // Generate a preview URL for the selected image
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
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
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet"></link>
      <h1 className="upload-title">Upload Image</h1>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="image" className="form-label">Select Image:</label>
          
          {/* Hidden file input */}
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          
          {/* Custom label acting as a button */}
          <label htmlFor="image" className="custom-file-button">
            Choose file
          </label>

          {/* Custom "No file chosen" text */}
          {!isFileSelected && <p className="custom-no-file">No file chosen</p>}
        </div>
        
        {/* Image preview */}
        {preview && (
          <div className="image-preview">
            <h4>Image Preview:</h4>
            <img src={preview} alt="Selected preview" className="preview-image" />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="name" className="form-label">Image Name (Required):</label>
          <input
            type="text"
            id="name"
            name="name"
            value={imageName}
            onChange={handleNameChange}
            placeholder="Enter image name"
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Upload</button>
      </form>
      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default UploadImage;
