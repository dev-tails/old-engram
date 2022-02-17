import { UnauthorizedError } from "./AuthMiddleware.js";

export async function AuthAPIKeyMiddleware(req, res, next) {
  const { user, db } = req;
  if (user) {
    return next();
  }

  const apiKey = req.headers["x-api-key"];

  const keyDocument = await db.collection("keys").findOne({
    key: apiKey,
  });

  if (!keyDocument) {
    throw new UnauthorizedError();
  }

  req.user = keyDocument.user;

  next();
}
