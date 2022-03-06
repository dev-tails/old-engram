import { NextFunction, Request, Response } from "express";

import { UserService } from "../auth/UserService";
import { PageService } from "../pages/PageService";
import { RoomService } from "../rooms/RoomService";

const userService = new UserService();
const roomService = new RoomService();
const pageService = new PageService();

export async function initServices() {
  await roomService.init();
  await userService.init();
  await pageService.init();
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
    };
    next();
  } catch (err) {
    next(err);
  }
}
