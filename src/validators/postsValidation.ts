import Joi from 'joi';

// Define a schema for post validation
export const validateCreatePost = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(3).required(),
  user_id: Joi.number().integer().required(),
});

export const validateUpdatePost = Joi.object({
  title: Joi.string().min(3).optional(),
  content: Joi.string().min(3).optional(),
  user_id: Joi.number().integer().optional(),
});