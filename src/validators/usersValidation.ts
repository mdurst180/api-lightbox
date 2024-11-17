import Joi from 'joi';

// Define a schema for user validation
export const validateCreateUser = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

export const validateGetUser = Joi.object().keys({
  userId: Joi.string().required(),
});