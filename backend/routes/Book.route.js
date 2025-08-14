import express from 'express';
import * as bookController from '../controllers/book.controller.js'
import auth from '../middleware/auth.js';

const router = express.Router();

router.use(auth); // Protect all routes below

router.post('/create', bookController.createBook);
router.get('/getAllBooks', bookController.getUserBooks);
router.get('/getSingleBook/:id', bookController.getBookById);
router.put('/updateBook/:id', bookController.updateBook);
router.delete('/deleteBook/:id', bookController.deleteBook);

export default router;