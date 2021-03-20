export function ErrorsMiddleware(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.sendStatus(401);
  }
  console.error(err);
  res.status(500).json({ errors: [err.message] });
}
