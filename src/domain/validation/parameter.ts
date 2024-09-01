import Joi from "joi";

export const parameterCreationSchema = Joi.object({
  group: Joi.string().required(),
  key: Joi.string().required(),
  value: Joi.string().required(),
  description: Joi.string().required(),
});

export const parameterUpdateSchema = Joi.object({
  group: Joi.string().optional(),
  value: Joi.string().optional(),
  description: Joi.string().optional(),
})
  .min(1)
  .message(
    "At least one of 'group', 'value' or 'description' fields has to be sent to update parameter."
  );
