import { Request, Response, NextFunction, Application } from 'express';
import express from 'express'
import chatRouter from './routes/chats.routes';
import  CustomError  from './exceptions/custom-error';

const app: Application = express();

// access body params especially when making a post/put request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiLevelMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('Request URL:', req.originalUrl);
    next()
}

app.use('/api/*', apiLevelMiddleware);

app.use('/api/chats', chatRouter)

app.use((error: any , req: Request, res: Response, next: NextFunction) => {
    console.log('aye', error.message)
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
      },
    });
    next()
  });

export default app;