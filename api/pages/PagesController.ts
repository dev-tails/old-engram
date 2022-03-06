import { Router } from "express";
import Joi from "joi";

export function initializePagesController(apiRouter: Router) {
  const router = Router();
  apiRouter.use("/pages", router);

  router.post("", async (req, res) => {
    const user = req.cookies["user"];
    console.log(user);
    const newPage = await req.services.pageService.createPage({
      user: "6223a2e222365c7a43e3d2da",
      body: req.body.body,
      type: req.body.type
    });
    res.json({
      data: newPage,
    });
  });

  router.get("", async (req, res) => {
    const userId = req.cookies["user"];
    const pages = await req.services.pageService.getForUser(
      "6223a2e222365c7a43e3d2da"
    );
    res.json({
      data: pages,
    });
  });

  router.get("/:id", async (req, res) => {
    const userId = req.cookies["user"];
    const page = await req.services.pageService.findById(
      req.params.id
    );
    
    res.json({
      data: page,
    });
  });
}
