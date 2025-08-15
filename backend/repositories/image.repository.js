
import Image from '../models/Image.model.js'
import ApiError from '../utils ( reusables )/ApiError.js'

export const createImage = async (imageData) => {
    try {
        const image = new Image(imageData);
        return await image.save();
    } catch (error) {
        if (error.code === 11000) {
            throw new ApiError(400, 'Duplicate image name for this chapter', 'DUPLICATE_IMAGE');
        }
        console.error('Error creating image:', error);
        throw new ApiError(500, 'Failed to create image');
    }
}

export const updateImagesChapterId = async (imageIds, chapterId) => {
    try {
        await Image.updateMany(
            { _id: { $in: imageIds } },
            { $set: { chapterId } }
        );
    } catch (error) {
        console.error('Error updating images:', error);
        throw new ApiError(500, 'Failed to associate images with chapter');
    }
};