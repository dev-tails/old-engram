import { Router } from "express";
import { BlockService } from "./BlockService";
import Joi from 'joi';

export function initializeBlockController(apiRouter: Router) {
  const router = Router();
  apiRouter.use("/blocks", router);

  router.get("", async (req, res) => {
    const blockService = req.services.blockService as BlockService;

    const blocks = await blockService.getAll(req.query);
    res.json({
      data: blocks,
    });
  });

  router.post("", async (req, res) => {
    const blockService = req.services.blockService as BlockService;

    const createBlockSchema = Joi.object<{
      body?: string;
      parent?: string;
      type: string;
      fileUUID?: string;
    }>({
      body: Joi.string().allow(""),
      type: Joi.string().required(),
      parent: Joi.string(),
      fileUUID: Joi.string(),
    });

    const { error, value } = createBlockSchema.validate(req.body);
    if (error) {
      throw error;
    }

    const newBlockId = await blockService.createBlock({
      ...value,
    });

    const newBlock = await blockService.findById(newBlockId);

    res.json({
      data: newBlock,
    });
  });
}
