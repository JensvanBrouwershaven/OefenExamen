
import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Check if the model already exists to avoid OverwriteModelError

const Image = mongoose.model('Image', ImageSchema);
export default Image;