import dotenv from 'dotenv';
dotenv.config();

import connectToDb from './db/db.js';

import cors from "cors";

const app = express();

import express from 'express';

import userRoutes from './routes/user.routes.js'
import captainRoutes from './routes/captain.routes.js'
connectToDb();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/users", userRoutes)
app.use("/captain", captainRoutes)


export default app