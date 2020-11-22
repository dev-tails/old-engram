import { UnauthorizedError } from "./AuthMiddleware.js";

export function AuthAPIKeyMiddleware(req, res, next) {
  const { user, db } = req;
  if (user) {
    return next();
  }

  const apiKey = req.headers["X-API-KEY"];

  const keyDocument = db.collection("keys").findOne({
    key: apiKey,
  });

  if (!keyDocument) {
    throw new UnauthorizedError();
  }

  req.user = keyDocument.user;

  next();
}
