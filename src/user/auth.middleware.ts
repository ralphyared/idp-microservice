import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { CustomError } from "../global/classes";
import { userErrorMessages } from "./user.error";
import { findUserById } from "./user.service";
import { ObjectId } from "mongodb";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return next(
      new CustomError(
        userErrorMessages.notAuthenticated.message,
        userErrorMessages.notAuthenticated.status
      )
    );
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return next(
      new CustomError(
        userErrorMessages.notAuthenticated.message,
        userErrorMessages.notAuthenticated.status
      )
    );
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    return next(
      new CustomError(
        userErrorMessages.notAuthenticated.message,
        userErrorMessages.notAuthenticated.status
      )
    );
  }

  const userId = (decodedToken as JwtPayload)._id;

  const user = await findUserById(userId);
  if (!user) {
    return next(
      new CustomError(
        userErrorMessages.notAuthenticated.message,
        userErrorMessages.notAuthenticated.status
      )
    );
  }

  req.user = userId as ObjectId;
  next();
};
