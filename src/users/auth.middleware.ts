import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { CustomError } from "../global/classes";
import { userErrorMessages } from "./user.error";
import { findUserById } from "./user.service";
import { ObjectId } from "mongodb";
import config from "../global/config";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");

  const notAuthorizedError = new CustomError(
    userErrorMessages.notAuthenticated.message,
    userErrorMessages.notAuthenticated.status
  );

  if (!authHeader) {
    return next(notAuthorizedError);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(notAuthorizedError);
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, config().authConfig.jwtSecret);
  } catch (err) {
    return next(notAuthorizedError);
  }

  const userId = (decodedToken as JwtPayload)._id;

  const user = await findUserById(userId);
  if (!user) {
    return next(notAuthorizedError);
  }

  req.user = userId as ObjectId;
  next();
};
