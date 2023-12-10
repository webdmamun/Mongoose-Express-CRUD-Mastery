import express, { Application, Request, Response } from 'express';
const app: Application = express();
import cors from 'cors';
import { UserRoutes } from './app/module/user.route';

//persers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Wow! Mongoose Express CRUD Mastery is Running',
  });
});

export default app;
