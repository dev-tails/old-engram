import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Router } from 'express';

import { initializeAdminController } from './admin/AdminController';
import { initializeUserController } from './auth/UserController';
import { initializeBlockController } from './blocks/BlockController';
import { initializeFileController } from './files/FileController';
import { initServices, servicesMiddleware } from './middleware/ServicesMiddleware';
import { initializePagesController } from './pages/PagesController';

async function main() {
  dotenv.config();

  await initServices();

  const app = express();

  app.use(
    cors({
      origin: ["http://calendar.xyzdigital.local", process.env.ORIGIN],
      default: process.env.ORIGIN,
    })
  );

  app.use(express.json());

  const apiRouter = Router();

  apiRouter.use(express.json());
  apiRouter.use(cookieParser());
  apiRouter.use(servicesMiddleware);

  initializeBlockController(apiRouter);
  initializeAdminController(apiRouter);
  initializeUserController(apiRouter);
  initializePagesController(apiRouter);
  initializeFileController(apiRouter);

  app.use("/api", apiRouter);

  app.listen(3939);
}

main();
