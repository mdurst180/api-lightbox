import express, { Application, Request, Response } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import routes from './routes/index';
import swaggerOptions from './swaggerConfig';
import morgan from 'morgan';
import logger from './logger';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Setup Morgan to use Winston for logging
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
}));

app.use(express.json());

// Initialize Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.use('/api', routes); // Register the routes under the /api path

// Sample route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

export default app;