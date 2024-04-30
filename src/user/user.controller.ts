import { Request, Response, NextFunction } from "express";

import * as service from "./user.service.js";
import { CustomError } from "../global/classes.js";
import { userErrorMessages } from "./user.error.js";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await service.signup(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.password,
      req.body.dateOfBirth
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await service.login(req.body.email, req.body.password);
    res.send(result);
  } catch (err) {
    next(err);
  }
};

export const viewProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await service.findUserById(req.user);
    const result = await service.viewProfile(user);
    res.send(result);
  } catch (err) {
    const error = new CustomError(
      userErrorMessages.userNotFound.message,
      userErrorMessages.userNotFound.status
    );
    next(error);
  }
};

export const editProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.editProfile(req.user, req.body);
    res.end();
  } catch (err) {
    const error = new CustomError(
      userErrorMessages.userNotFound.message,
      userErrorMessages.userNotFound.status
    );
    next(error);
  }
};
