import { Router } from 'express';

export function initializeAdminController(apiRouter: Router) {
  const router = Router();
  apiRouter.use("/admin", router);

  router.get("/users", async(req, res) => {
    const userId = req.cookies["user"];
    const user = await req.services.userService.findById(userId);
    if (!user?.superuser) {
      throw new Error("Unauthorized")
    }

    const users = await req.services.userService.adminFindAllUsers();
    res.json({ data: users })
  })
}