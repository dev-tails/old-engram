import { Router } from "express";
import Joi from "joi";

export function initializePagesController(apiRouter: Router) {
  const router = Router();
  apiRouter.use("/pages", router);

  router.post("", async (req, res) => {
    const user = req.cookies["user"];

    const createPageSchema = Joi.object<{
      body?: string;
      parent?: string;
      type: string;
    }>({
      body: Joi.string(),
      type: Joi.string().required(),
      parent: Joi.string()
    })

    const {error, value} = createPageSchema.validate(req.body)
    if (error) {
      throw error;
    }
    console.log(value);

    const newPage = await req.services.pageService.createPage({
      user: "6223a2e222365c7a43e3d2da",
      ...value
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
