import express from 'express';

export function initializeFlagRouter({ db }) {
  const Flag = db.collection("flags");
  const router = express.Router();

  router.get("", async (req, res, next) => {
    try {
      const flags = await Flag.find().toArray();

      res.json({
        success: true,
        data: flags,
      });
    } catch (err) {
      res.json({ success: false, errors: [err] });
    }
  });

  const adminRouter = express.Router();

  router.use("/admin", adminRouter);

  adminRouter.post("", async (req, res, next) => {
    try {
      const name = req.body.name;

      await Flag.insertOne({
        name,
        enabled: req.body.enabled === true ? true : false,
      });

      res.json({
        success: true,
      });
    } catch (err) {
      res.json({ success: false, errors: [err] });
    }
  });

  adminRouter.put("/:name", async (req, res, next) => {
    try {
      const name = req.params.name;

      await Flag.updateOne(
        {
          name,
        },
        {
          enabled: req.body.enabled === true ? true : false,
        }
      );

      res.json({
        success: true,
      });
    } catch (err) {
      res.json({ success: false, errors: [err] });
    }
  });

  return router;
}
