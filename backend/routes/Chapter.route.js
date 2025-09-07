import express from 'express';
import * as chapterController from '../controllers/chapter.controller.js'
import auth from '../middleware/auth.js';
import upload from '../middleware/multer.js';
import uploadChapter from '../middleware/multerLocal.js';

const router = express.Router();


// using my auth middleware to protect backend!
router.use(auth);

const multiUpload = uploadChapter.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 10 }
]);

router.post(
  "/create",
  multiUpload,
  chapterController.createChapter
);

router.get('/getAllChapters', chapterController.getUserChapters);

router.get('/getAllChaptersByBook/:id', chapterController.getAllChaptersByBook)

router.get('/getSingleChapter/:id', chapterController.getChapterById);

router.put('/updateChapter/:id', chapterController.updateChapter);

router.delete('/deleteChapter/:id', chapterController.deleteChapter);

export default router;