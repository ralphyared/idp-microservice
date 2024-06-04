import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

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

  if (!authHeader) {
    return next(userErrorMessages.notAuthorized);
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(userErrorMessages.notAuthorized);
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, config().authConfig.jwtSecret);
  } catch (err) {
    return next(userErrorMessages.notAuthorized);
  }

  const userId = (decodedToken as JwtPayload)._id;

  const user = await findUserById(userId);

  if (!user) {
    return next(userErrorMessages.notAuthorized);
  }

  const payload = {
    id: userId as ObjectId,
    dateOfBirth: (decodedToken as JwtPayload).dateOfBirth as Date,
    name: (decodedToken as JwtPayload).name as string,
  };

  req.user = payload;
  next();
};
