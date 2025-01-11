import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';

import connectToDb from './db/db.js';

import cors from "cors";

const app = express();

import express from 'express';

import userRoutes from './routes/user.routes.js'
import captainRoutes from './routes/captain.routes.js'
import mapsRoutes from './routes/maps.routes.js'
import rideRoutes from './routes/ride.routes.js'
connectToDb();


app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use("/users", userRoutes)
app.use("/captain", captainRoutes)
app.use("/maps", mapsRoutes)
app.use("/rides", rideRoutes)


export default app