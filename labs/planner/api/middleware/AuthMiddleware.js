import jwt from 'jsonwebtoken';

import { getEnv } from '../env.js';

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
        resolve(null);
      }
      resolve(decoded);
    });
  });
}

export async function AuthMiddleware(req, res, next) {
  if (req.cookies.token) {
    const decoded = await getDecodedToken(req.cookies.token);
    req.user = decoded?.user;
  }
  next();
}
