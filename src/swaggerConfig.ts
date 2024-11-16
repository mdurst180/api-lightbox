import { SwaggerOptions } from "swagger-ui-express";

const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User and Post Management API',
      version: '1.0.0',
      description: 'A simple RESTful API for managing users and posts',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Path to your route files for Swagger annotations
};

export default swaggerOptions;
