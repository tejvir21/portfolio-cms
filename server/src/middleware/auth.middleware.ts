import { Request, Response, NextFunction } from "express";

import { ApiError } from "../utils/ApiError";
import { verifyToken } from "../utils/jwt";

export const protect = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "Unauthorized. Token missing."));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);

    req.user = decoded;

    next();
  } catch {
    next(new ApiError(401, "Unauthorized. Invalid token."));
  }
};
