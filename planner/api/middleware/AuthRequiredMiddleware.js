import { UnauthorizedError } from "./AuthMiddleware.js";

export function AuthRequiredMiddleware(req, res, next) {
  if (!req.user) {
    next(new UnauthorizedError());
  }
  next();
}
