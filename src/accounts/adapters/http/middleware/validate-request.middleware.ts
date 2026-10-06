import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors
        .array()
        .filter((error) => error.type === "field")
        .map(({ path, msg }) => ({ path, msg })),
    });
  }

  next();
}
