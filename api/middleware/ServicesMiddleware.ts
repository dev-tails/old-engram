import { NextFunction, Request, Response } from 'express';

import { UserService } from '../auth/UserService';

export async function servicesMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userService = new UserService();

    await userService.init();

    req.services = {
      userService,
    };
    next();
  } catch (err) {
    next(err);
  }
}
