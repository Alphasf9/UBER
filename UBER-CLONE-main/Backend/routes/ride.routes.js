import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { body, query } from 'express-validator';
import { confirmRide, createRideController, endRide, startRide } from '../controllers/ride.controller.js';
import { getFareController } from '../controllers/ride.controller.js';
const router = express.Router();

router.post('/create', authMiddleware.authUser, [
    body('pickup').isString().isLength({ min: 3 }).withMessage('pickup must be a string with a minimum length of 3 characters'),
    body('destination').isString().isLength({ min: 3 }).withMessage('dropoff must be a string with a minimum length of 3 characters'),
    body('vehicleType').isString().isIn(['auto', 'car', 'motorcycle']).withMessage('vehicleType must be either auto, car or motorcycle')
], createRideController);


router.get('/get-fare', authMiddleware.authUser, [
    query('pickup').isString().isLength({ min: 3 }).withMessage('pickup must be a string with a minimum length of 3 characters'),
    query('destination').isString().isLength({ min: 3 }).withMessage('dropoff must be a string with a minimum length of 3 characters')
], getFareController)


router.post('/confirm', authMiddleware.authCaptain, [
    body('rideId').isMongoId().withMessage('rideId must be a string with a minimum length of 12 characters')
    // body('otp').isString().isLength({ min: 6, max: 6 }).withMessage('otp must be a string with a length of 6 characters')
], confirmRide)


router.get('/start-ride', authMiddleware.authCaptain, [
    query('rideId').isMongoId().withMessage('Inavild ride Id'),
    query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid otp')
],startRide)


router.post('/end-ride', authMiddleware.authCaptain,[
    body('rideId').isMongoId().withMessage('Inavild ride Id')
],endRide)




export default router