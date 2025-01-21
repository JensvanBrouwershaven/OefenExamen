const Image = require('../Models/ImageModel'); // Assuming you have an Image model

// GET all images
const getAllImages = async (req, res) => {
  try {
    const images = await Image.find(); // Fetch images from DB
    res.json({ message: 'Images retrieved successfully', images });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving images', error });
  }
};

// GET image by ID
const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json({ message: 'Image found', image });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving image', error });
  }
};

// POST create a new image (with file upload)
const createImage = async (req, res) => {
  const { name } = req.body; // Assuming the name is sent in the body
  const imageUrl = req.file ? req.file.path : null; // Handle file upload

  if (!imageUrl) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  try {
    const newImage = new Image({
      name,
      imageUrl, // Image file path
    });

    await newImage.save();
    res.status(201).json({ message: 'Image created', image: newImage });
  } catch (error) {
    res.status(500).json({ message: 'Error creating image', error });
  }
};

// DELETE image by ID
const deleteImage = async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json({ message: 'Image deleted', image });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting image', error });
  }
};

// PATCH update image name by ID
const updateImageName = async (req, res) => {
  const { name } = req.body; // New name for the image
  try {
    const image = await Image.findByIdAndUpdate(
      req.params.id,
      { name }, // Update the name field
      { new: true }
    );
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json({ message: 'Image updated', image });
  } catch (error) {
    res.status(500).json({ message: 'Error updating image', error });
  }
};

module.exports = {
  getAllImages,
  getImageById,
  createImage,
  deleteImage,
  updateImageName,
};
