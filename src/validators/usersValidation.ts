import Joi from 'joi';

export const validateCreateUser = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

export const validateUpdateUser = Joi.object({
  name: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
});

export const validateGetUser = Joi.object().keys({
  userId: Joi.string().required(),
});