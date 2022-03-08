import { Router } from 'express';
import multer from 'multer';

import { config } from '../config';

const upload = multer({ dest: config.files.uploadPath });

export function initializeFileController(apiRouter: Router) {
  const router = Router();
  apiRouter.use("/files", router);

  router.post("", upload.single("file_upload"), async (req, res, next) => {
    console.log(req.file)
    await req.services.fileService.insertMany([
      {
        name: req.file.originalname,
        originalname: req.file.originalname,
        filename: req.file.filename,
        encoding: req.file.encoding,
        mimetype: req.file.mimetype,
      },
    ]);
    res.sendStatus(200);
  });
}
