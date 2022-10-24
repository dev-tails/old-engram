import { Router } from 'express';
import Joi from 'joi';

export function initializePagesController(apiRouter: Router) {
  const router = Router();
  apiRouter.use("/pages", router);

  router.post("", async (req, res) => {
    const createPageSchema = Joi.object<{
      body?: string;
      parent?: string;
      type: string;
      fileUUID?: string;
    }>({
      body: Joi.string().allow(''),
      type: Joi.string().required(),
      parent: Joi.string(),
      fileUUID: Joi.string()
    })

    const {error, value} = createPageSchema.validate(req.body)
    if (error) {
      throw error;
    }

    const newPageId = await req.services.pageService.createPage({
      ...value
    });

    const newPage = await req.services.pageService.findById(newPageId);

    res.json({
      data: newPage,
    });
  });

  router.get("", async (req, res) => {
    const pages = await req.services.pageService.getAll();
    res.json({
      data: pages,
    });
  });

  router.get("/:id", async (req, res) => {
    const page = await req.services.pageService.findById(
      req.params.id
    );
    
    res.json({
      data: page,
    });
  });

  router.put("/:id", async (req, res) => {
    const page = await req.services.pageService.updateById(
      req.params.id,
      req.body
    );
    
    res.json({
      data: page,
    });
  });

  router.delete("/:id", async (req, res) => {
    await req.services.pageService.removeById(
      req.params.id
    );
    
    res.sendStatus(200);
  });
}
