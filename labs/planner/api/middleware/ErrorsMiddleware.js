export function ErrorsMiddleware(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      errors: ["Unauthorized"],
    });
  }
  console.error(err);
  res.status(500).json({ errors: [err.message] });
}
