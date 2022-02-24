import { Router } from 'express';
import Joi from 'joi';

import { CreateUserParams } from '../auth/UserService';

export function initializeAdminController(apiRouter: Router) {
  const router = Router();
  apiRouter.use("/admin", router);

  router.use(async (req, res, next) => {
    const userId = req.cookies["user"];
    const user = await req.services.userService.findById(userId);
    if (!user?.superuser) {
      next(new Error("Unauthorized"));
    }
    next();
  });

  router.get("/users", async (req, res) => {
    const users = await req.services.userService.adminFindAllUsers();
    res.json({ data: users });
  });

  router.post("/users", async (req, res) => {
    const CreateUserSchema = Joi.object<CreateUserParams>({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(12),
      color: Joi.string(),
    });

    const { error, value } = CreateUserSchema.validate(req.body);
    if (error) {
      throw error;
    }

    const { insertedId } = await req.services.userService.createUser(value);
    const createdDoc = await req.services.userService.findById(String(insertedId));

    res.json({ data: createdDoc });
  });
}
