import express from 'express';
import * as userController from '../controllers/user.controller.js'

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.post('/reset-password', userController.resetPassword);
router.post('/get-code', userController.getCode);

export default router;