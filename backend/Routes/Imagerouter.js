import express from 'express';
import multer from 'multer';
import path from 'path';
import {createImage, getAllImages} from '../Controller/ImageController.js';

const router = express.Router();

// Stel opslaglocatie en bestandsnaam in voor afbeeldingen
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Zorg ervoor dat de map 'uploads' bestaat
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Filter om alleen afbeeldingen te accepteren
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Alleen afbeeldingsbestanden zijn toegestaan!'), false);
  }
};

// Initialize multer with storage and fileFilter
const upload = multer({ storage, fileFilter });

router.get('/', getAllImages)

// Use the upload middleware before calling createImage
router.post('/', upload.single('image'), createImage)

// Delete image from the database

export default router;
