import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { getAutoCompleteSuggestions, getCoordinates, getDistanceTime } from '../controllers/map.controller.js';
import { query } from 'express-validator'

const router = express.Router();

router.get('/get-coordinates', [
    query('address').isString().isLength({ min: 3 }).withMessage("Address must be at least 3 characters long")
],
    authMiddleware.authUser, getCoordinates);



router.get('/get-distance-time', [
    query('origin').isString().isLength({ min: 3 }).withMessage("Origin must be at least 3 characters long"),
    query('destination').isString().isLength({ min: 3 }).withMessage("Destination must be at least 3 characters long")
], authMiddleware.authUser, getDistanceTime);



router.get('/get-suggestions',[
    query('input').isString().isLength({ min: 3 }).withMessage("Address must be at least 3 characters long")
],authMiddleware.authUser,getAutoCompleteSuggestions);






export default router;