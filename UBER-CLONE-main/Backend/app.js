import dotenv from 'dotenv';
dotenv.config();

import connectToDb from './db/db.js';

import cors from "cors";

const app = express();

import express from 'express';

import userRoutes from './routes/user.routes.js'
connectToDb();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/users", userRoutes)


export default app