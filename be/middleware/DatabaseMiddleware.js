import { getDb } from "../Database.js";

export function DatabaseMiddleware(req, res, next) {
  req.db = getDb();
  next();
}
