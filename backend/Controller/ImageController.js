const Image = require('../Models/ImageModel');

// POST a new image (with URL)
const createImage = async (req, res) => {
  const { name, imageUrl } = req.body;

  if (!name || !imageUrl) {
    return res.status(400).json({ error: 'Name and imageUrl are required' });
  }

  try {
    const image = await Image.create({ name, imageUrl });
    res.status(201).json({ message: 'Image created successfully', image });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createImage,
};
