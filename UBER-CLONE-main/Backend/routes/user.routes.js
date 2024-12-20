import express from 'express';


const router = express.Router();

import { body } from 'express-validator'
import userController from '../controllers/user.controller.js';

router.post('/register', [
    body('email').isEmail().withMessage("Invalid email"),
    body('fullname').isLength({ min: 3 }).withMessage("First name should be at least 3 characters long"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
],
    userController.registerUser
)


router.post('/login', [
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
],
 userController.loginUser
)




export default router;