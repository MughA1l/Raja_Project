
import mongoose from "mongoose";
import { Schema } from "mongoose";

const videoSchema = new Schema(
  {
    title: { type: String },
    url: { type: String },
    thumbnail: { type: String },
  },
  { _id: false }
);

const imageSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    chapterId: {
      type: Schema.Types.ObjectId,
      ref: 'Chapter',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    ocr: {
      type: String,
    },
    enhancedText: {
      type: String,
    },
    videos: [videoSchema],
  },
  {
    timestamps: true,
  }
);

// 🔐 Compound index to enforce unique name per user per chapter
imageSchema.index({ userId: 1, chapterId: 1, name: 1 }, { unique: true });

const Image = mongoose.model('Image', imageSchema);

export default Image;
