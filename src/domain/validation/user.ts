import Joi from "joi";

const passwordSchema = Joi.string().required();

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: passwordSchema,
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: passwordSchema,
});

export const resetSchema = Joi.object({
  email: Joi.string().email().required(),
  password: passwordSchema,
});
