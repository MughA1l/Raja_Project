import express from 'express';
import * as chapterController from '../controllers/chapter.controller.js'
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';

const router = express.Router();

router.use(auth);

router.post(
    '/create',
    upload.fields([
        { name: 'image', maxCount: 1 },       // Cover image
        { name: 'images', maxCount: 10 },     // Multiple chapter images
    ]),
    chapterController.createChapter
);

router.get('/getAllChapters', chapterController.getUserChapters);

router.get('/getSingleChapter/:id', chapterController.getChapterById);

router.put('/updateChapter/:id', chapterController.updateChapter);

router.delete('/deleteChapter/:id', chapterController.deleteChapter);

export default router;