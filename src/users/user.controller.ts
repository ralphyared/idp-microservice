import { Request, Response, NextFunction } from "express";

import * as service from "./user.service.js";
import { userErrorMessages } from "./user.error.js";
import { SignupDto } from "./dto/signup.dto.js";
import { LoginDto } from "./dto/login.dto.js";
import { EditProfileDto } from "./dto/edit-profile.dto.js";
import { UserDocument } from "../global/types.js";
import { handleFilesFormData } from "@eurisko/common-utils-node";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await service.signup(req.body as SignupDto);
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
    const result = await service.login(req.body as LoginDto);
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
    const user = await service.findUserById(req.user.id);
    const result = await service.viewProfile(user as UserDocument);
    res.send(result);
  } catch (err) {
    next(userErrorMessages.userNotFound);
  }
};

export const editProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await service.editProfile(req.user._id, req.body as EditProfileDto);
    res.end();
  } catch (err) {
    console.log(err)
    next(userErrorMessages.userNotFound);
  }
};

// export const uploadProfilePicture = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//   //  service.uploadProfilePicture()
//   } catch (err) {
//     next(userErrorMessages.userNotFound);
//   }
// };
