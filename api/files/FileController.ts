import { Router } from 'express';
import multer from 'multer';

import { config } from '../config';
import { FileService } from './FileService';

const upload = multer({ dest: config.files.uploadPath });

export function initializeFileController(apiRouter: Router) {
  const router = Router();
  apiRouter.use("/files", router);

  router.post("", upload.single("file_upload"), async (req, res, next) => {
    const fileService = req.services.fileService as FileService;
    const { insertedId } = await fileService.insertOne(
      {
        name: req.file.originalname,
        filename: req.file.filename,
        uuid: req.file.filename,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
      },
    );

    const file = await fileService.findById(insertedId);

    res.json({
      data: file
    });
  });
}
