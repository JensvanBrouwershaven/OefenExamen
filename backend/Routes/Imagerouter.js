const express = require('express');
const multer = require('multer');
const {
  getAllImages,
  getImageById,
  createImage,
  deleteImage,
  updateImageName,
} = require('../Controller/ImageController'); // Import controller functions

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Custom file naming
  },
});

const upload = multer({ storage }); // Set up the multer instance for file handling

// GET all images
router.get('/', getAllImages); // Handles getting all images

// GET a single image by ID
router.get('/:id', getImageById); // Handles getting a single image by ID

// POST a new image (with file upload)
router.post('/', upload.single('image'), createImage); // Handles creating a new image, file upload

// DELETE an image by ID
router.delete('/:id', deleteImage); // Handles deleting an image by ID

// PATCH (update) an image's name by ID
router.patch('/:id', updateImageName); // Handles updating an image's name

module.exports = router;
