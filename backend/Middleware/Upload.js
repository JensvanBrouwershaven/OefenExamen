import multer from 'multer';
import path from 'path';
 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
 
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limiteer bestandsgrootte tot 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = fileTypes.test(file.mimetype);
    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb(new Error('Alleen afbeeldingen zijn toegestaan'));
    }
  },
});
 
export default upload;
 