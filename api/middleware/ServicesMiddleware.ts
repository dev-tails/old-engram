import { NextFunction, Request, Response } from 'express';

import { UserService } from '../auth/UserService';
import { PageService } from '../pages/PageService';
import { RoomService } from '../rooms/RoomService';

export async function servicesMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userService = new UserService();
    const roomService = new RoomService();
    const pageService = new PageService();

    await roomService.init();
    await userService.init();
    await pageService.init();

    req.services = {
      pageService,
      roomService,
      userService,
    };
    next();
  } catch (err) {
    next(err);
  }
}
