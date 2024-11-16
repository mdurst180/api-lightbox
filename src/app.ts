import express, { Application, Request, Response } from 'express';
import routes from './routes/index';


const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', routes); // Register the routes under the /api path

// Sample route for testing
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});