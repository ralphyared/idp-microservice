import { ObjectSchema } from "joi";
import { ReqType } from "./enums";
import { NextFunction, Request, Response } from "express";

export const validate =
  (schemas: Map<ReqType, ObjectSchema>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const errorMessages = [];

    for (const type of schemas.keys()) {
      const schema = schemas.get(type);
      const { error } = schema!.validate(req[type]);
      if (error) errorMessages.push(error.details[0].message);
    }

    const error = {
      statusCode: 400,
      messages: errorMessages,
    };

    errorMessages.length ? next(error) : next();
  };
