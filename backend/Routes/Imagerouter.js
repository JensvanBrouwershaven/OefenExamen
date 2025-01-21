const express = require('express');
const { createImage } = require('../Controller/ImageController');

const router = express.Router();

// POST route to create a new image with URL
router.post('/', createImage);

module.exports = router;
