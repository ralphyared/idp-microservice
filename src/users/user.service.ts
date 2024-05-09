import { compareSync, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from "../global/classes";
import User from "./user.model";
import { userErrorMessages } from "./user.error";

import "../global/types";
import mongoose, { Document } from "mongoose";
import { SignupDto } from "./dto/signup.dto";
import { LoginDto } from "./dto/login.dto";
import { EditProfileDto } from "./dto/edit-profile.dto";
import config from "../global/config";
import { UserDocument } from "../global/types";

export const signup = async (body: SignupDto) => {
  const { firstName, lastName, email, password, dateOfBirth } = body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const err = new CustomError(
      userErrorMessages.emailAlreadyInUse.message,
      userErrorMessages.emailAlreadyInUse.status
    );
    throw err;
  }

  const hashedPw = await hash(password, 12);
  const user = new User({
    email,
    password: hashedPw,
    firstName,
    lastName,
    dateOfBirth,
  });
  const savedUser = await user.save();
  const userId = savedUser._id;

  const token = await signUserJwt(savedUser);

  return { token, userId };
};

export const login = async (body: LoginDto) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) {
    const err = new CustomError(
      userErrorMessages.emailNotFound.message,
      userErrorMessages.emailNotFound.status
    );
    throw err;
  }

  const isEqual = compareSync(password, user.password!);
  if (!isEqual) {
    const err = new CustomError(
      userErrorMessages.wrongPassword.message,
      userErrorMessages.wrongPassword.status
    );

    throw err;
  }
  const userId = user._id;
  const token = await signUserJwt(user);

  return { token, userId };
};

const signUserJwt = async (user: Document) => {
  const userObj = user.toObject();
  delete userObj.password;

  const token = jwt.sign(userObj, config().authConfig.jwtSecret, {
    expiresIn: config().authConfig.jwtExpiration,
  });

  return token;
};

export const findUserById = async (id: mongoose.Types.ObjectId) => {
  return User.findOne({ _id: id });
};

export const viewProfile = async (user: UserDocument) => {
  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    dateOfBirth: user.dateOfBirth,
  };
};

export const editProfile = async (
  id: mongoose.Types.ObjectId,
  body: EditProfileDto
) => {
  const { firstName, lastName, dateOfBirth } = body;
  return User.findOneAndUpdate(
    { _id: id },
    { firstName, lastName, dateOfBirth }
  );
};
