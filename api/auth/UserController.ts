import { Router } from 'express';
import Joi from 'joi';

import { CheckLoginParams } from './UserService';

export function initializeUserController(apiRouter: Router) {
  const router = Router();
  apiRouter.use("/users", router);

  router.get("/self", async(req, res) => {
    const userId = req.cookies["user"];
    const user = await req.services.userService.findById(userId);

    res.json({ data: user });
  })

  const UserLoginSchema = Joi.object<CheckLoginParams>({
    email: Joi.string().email().required(),
    password: Joi.string().min(12).required(),
  });

  router.post("/login", async (req, res, next) => {
    const { error, value } = UserLoginSchema.validate(req.body);
    if (error) {
      return next(error);
    }

    const { email, password } = value;

    const user = await req.services.userService.checkLogin({
      email,
      password,
    });

    res.cookie("user", user._id);
    res.sendStatus(200);
  });
}
