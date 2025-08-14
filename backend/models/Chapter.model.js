
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const chapterSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    isMids: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Image',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chapter = mongoose.model('Chapter', chapterSchema);

export default Chapter;