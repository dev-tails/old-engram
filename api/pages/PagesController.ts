import { Router } from 'express';
import Joi from 'joi';

export function initializePagesController(apiRouter: Router) {
  const router = Router();
  apiRouter.use("/pages", router);

  router.get("", async (req, res) => {
    const userId = req.cookies["user"];
    res.json({
      data: [
        {
          _id: "1",
          type: "page",
          body: "Web Development",
          content: ["2"]
        },
        {
          _id: "2",
          parent: "1",
          type: "page",
          body: "How to Build Your First HTML Page",
          content: [
            "3"
          ]
        },
      ]
    })
  });
}
