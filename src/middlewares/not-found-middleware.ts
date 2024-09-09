import { Request, Response, NextFunction } from "express";

export default function notFound(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res
    .status(404)
    .json({
      error: "Not found buddy, The route you searching for does not exist",
    });
}
