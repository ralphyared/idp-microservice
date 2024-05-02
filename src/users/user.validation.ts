import Joi, { ObjectSchema } from "joi";
import { ReqType } from "../global/enums";

export const signupSchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.BODY,
    Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      dateOfBirth: Joi.date().required(),
    }),
  ],
]);

export const loginSchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.BODY,
    Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  ],
]);

export const editProfileSchema: Map<ReqType, ObjectSchema> = new Map<
  ReqType,
  ObjectSchema
>([
  [
    ReqType.BODY,
    Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      dateOfBirth: Joi.date(),
    }),
  ],
]);
