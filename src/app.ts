import { Request, Response, NextFunction, Application } from 'express';
import express from 'express'
import chatRouter from './routes/chats.routes';
import CustomError from './exceptions/custom-error';
import userRouter from './routes/users.routes';
import AuthMiddleware from './middlewares/authenticate.middleware';
import propertyRouter from './routes/properties.routes';
import cors from 'cors';

const app: Application = express();
// handle cors issue.
app.use(cors())
// access body params especially when making a post/put request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const apiLevelMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   console.log('Request URL:', req.originalUrl, req.body.last_connection);
//   next()
// }

// app.use('/api/*', apiLevelMiddleware);

/**
 * Routes
 */
app.use('/api/chats', chatRouter);
app.use('/api/users', userRouter);
app.use('/api/properties', AuthMiddleware, propertyRouter);

/**
 * Handle App Level Error
 */
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({
    message: error.message || 'Internal Server Error',
  });
  next()
});

/**
 * Handle 404 Error
 */
app.use('*', (req, res, next) => {
  res.status(404).send({
    message: 'Route Not Found',
  });
})
export default app;