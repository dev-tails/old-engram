import { NextFunction, Request, Response } from 'express';

import { UserService } from '../auth/UserService';
import { RoomService } from '../rooms/RoomService';

export async function servicesMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userService = new UserService();
    const roomService = new RoomService();

    await roomService.init();
    await userService.init();

    req.services = {
      roomService,
      userService,
    };
    next();
  } catch (err) {
    next(err);
  }
}
