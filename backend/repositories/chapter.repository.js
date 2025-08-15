
import ApiError from '../utils ( reusables )/ApiError.js';
import Chapter from '../models/Chapter.model.js';

export const createChapter = async (chapterData) => {
  try {
    const newChapter = new Chapter(chapterData);
    return await newChapter.save();
  } catch (error) {

    if (error.code === 11000 && error.keyPattern?.bookId && error.keyPattern?.name) {
      throw new ApiError(400, 'Chapter name must be unique within the same book', 'DUPLICATE_CHAPTER');
    }
    console.error('Error creating chapter:', error);
    throw new ApiError(500, 'Failed to create chapter');
  }
};

export const findByUserId = async (userId) => {
  try {
    const chapters = await Chapter.find({ userId })
      .populate('bookId')
      .populate('images')
      .sort({ createdAt: -1 })
      .lean();

    return chapters;
  } catch (error) {
    throw new ApiError(500, "Database error while fetching chapters", "DB_ERROR");
  }
};



