
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { validate } from '../../middleware/validation';

const testSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
});

describe('validate middleware', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    // Reset mocks before each test
    mockReq = {};
    mockRes = {
      status: jest.fn().mockReturnThis(),  // Mock .status to allow method chaining
      json: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next() if validation passes', async () => {
    mockReq.body = {
      name: 'John Doe',
      email: 'john.doe@example.com',
    };

    // Call the validate middleware
    validate(testSchema)(mockReq as Request, mockRes as Response, next);

    // Ensure next() was called
    expect(next).toHaveBeenCalled();
  });


  it('should return 400 and error details if validation fails', async () => {
    // Simulate an invalid request body (missing both name and email)
    mockReq.body = {};

    // Call the validate middleware
    validate(testSchema)(mockReq as Request, mockRes as Response, next);

    // Check that the response status was 400
    expect(mockRes.status).toHaveBeenCalledWith(400);

    // Ensure next() was not called (because validation failed)
    expect(next).not.toHaveBeenCalled();
  });
});
