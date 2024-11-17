// src/middleware/validate.ts
import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export const validate = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false }); // `abortEarly: false` shows all validation errors
    if (error) {
      return res.status(400).json({
        error: 'validation_error',
        details: error.details.map(detail => detail.message), // Send detailed error messages
      });
    }
    next();
  };
};
