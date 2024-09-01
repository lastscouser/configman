import { Request, Response } from "express";
import Joi from "joi";
import { InvalidParameter } from "../domain/exception";

export function requestValidator(
  schema: Joi.ObjectSchema<any>,
  options?: Joi.ValidationOptions
) {
  return async (req: Request, res: Response, next: Function) => {
    const { error } = schema.validate(
      req.method === "GET" ? req.query : req.body,
      options
    );
    if (error) throw new InvalidParameter(error.details[0].message, 2006);

    next();
  };
}
