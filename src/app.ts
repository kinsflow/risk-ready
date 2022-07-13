import { Request, Response, NextFunction } from 'express';
import express from 'express'
import chatRouter from './routes/chats.routes';
=
const app = express();

// access body params especially when making a post/put request
app.use(express.json());

const apiLevelMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('Request URL:', req.originalUrl);
    next()
}

app.use('/api/*', apiLevelMiddleware);

app.use('/api/chats', chatRouter)

export default app;