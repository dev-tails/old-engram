import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { AuthMiddleware } from "./middleware/AuthMiddleware.js";
import { getEnv } from "./env.js";
import { initializeUserRouter } from "./routes/UsersRouter.js";
import { initializeNotesRouter } from "./routes/NotesRouter.js";
import { initializeWidgetsRouter } from "./routes/WidgetsRouter.js";
import { initializeDb } from "./Database.js";
import { DatabaseMiddleware } from "./middleware/DatabaseMiddleware.js";
import { ErrorsMiddleware } from "./middleware/ErrorsMiddleware.js";

const { origin, port } = getEnv();

run();

async function run() {
  const db = await initializeDb();

  const app = express();

  if (app.get("env") === "production") {
    app.set("trust proxy", 1); // trust first proxy
  }

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(AuthMiddleware);
  app.use(DatabaseMiddleware);

  const apiRouter = express.Router();

  app.use("/api", apiRouter);
  apiRouter.use("/users", initializeUserRouter());
  apiRouter.use("/notes", initializeNotesRouter());
  apiRouter.use("/widgets", initializeWidgetsRouter());

  app.use(ErrorsMiddleware);

  app.listen(port);
}
