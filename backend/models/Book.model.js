
import mongoose from 'mongoose'
import { Schema } from 'mongoose';

const bookSchema = new Schema(
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
        chapters: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Chapter',
            },
        ],
    },
    {
        timestamps: true,
    }
);

// one user cannot have the same named book again
bookSchema.index({ userId: 1, name: 1 }, { unique: true });

const Book = mongoose.model('Book', bookSchema);

export default Book;
