import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Router } from 'express';

import { initializeUserController } from './auth/UserController';
import { servicesMiddleware } from './middleware/ServicesMiddleware';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.ORIGIN
}))

const apiRouter = Router();

apiRouter.use(express.json());
apiRouter.use(cookieParser());
apiRouter.use(servicesMiddleware);

initializeUserController(apiRouter);

app.use("/api", apiRouter);

app.listen(3939);
