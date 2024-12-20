import express from 'express';

const router = express.Router();

import { body } from 'express-validator'

import captainController from '../controllers/captain.controller.js';

router.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage("First name should be at least 3 characters long"),
    body('email').isEmail().withMessage("Invalid email"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body('vehicle.color').isLength({ min: 3 }).withMessage("Vehicle color must be at least 3 characters long"),
    body('vehicle.plate').isLength({ min: 3 }).withMessage("Vehicle plate must be at least 3 characters long"),
    body('vehicle.capacity').isLength({ min: 1 }).withMessage("Vehicle capacity must be at least 1"),
    body('vehicle.vehicleType').isLength({ min: 3 }).withMessage("Vehicle type must be at least 3 characters long"),
],
    captainController.registerCaptain
)

export default router

