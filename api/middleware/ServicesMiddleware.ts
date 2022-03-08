import { NextFunction, Request, Response } from 'express';

import { UserService } from '../auth/UserService';
import { FileService } from '../files/FileService';
import { PageService } from '../pages/PageService';
import { RoomService } from '../rooms/RoomService';

const userService = new UserService();
const roomService = new RoomService();
const pageService = new PageService();
const fileService = new FileService();

export async function initServices() {
  await roomService.init();
  await userService.init();
  await pageService.init();
  await fileService.init();
}

export async function servicesMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.services = {
      pageService,
      roomService,
      userService,
      fileService
    };
    next();
  } catch (err) {
    next(err);
  }
}
