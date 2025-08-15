
import express from 'express';
import * as imageController from '../controllers/image.controller.js'
import auth from '../middleware/auth.js'
import upload from '../middleware/multer.js';

const router = express.Router();

router.use(auth);


export default router;

