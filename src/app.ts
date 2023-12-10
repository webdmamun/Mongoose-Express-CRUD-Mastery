import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { userRoute } from './app/modules/user/user.route';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoute);

// Respond to the request with 'Server is running'
app.get('/', (req: Request, res: Response) => {
  res.send('Wow! The Application is running successfully');
});

app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Page not found',
    error: {
      code: 404,
      description: 'Page not found',
    },
  });
});

export default app;
