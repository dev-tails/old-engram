import jwt from "jsonwebtoken";
import { getEnv } from "../env.js";

const { jwtSecret } = getEnv();

export class UnauthorizedError extends Error {
  constructor() {
    super();
    this.name = "UnauthorizedError";
  }
}

export async function getDecodedToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtSecret, function (err, decoded) {
      if (err) {
        reject(new UnauthorizedError());
      }
      resolve(decoded);
    });
  });
}

export async function AuthMiddleware(req, res, next) {
  const { user } = await getDecodedToken(req.cookies.token);
  req.user = user;
  next();
}
