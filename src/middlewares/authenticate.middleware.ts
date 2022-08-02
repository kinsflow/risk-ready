import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

const AuthMiddleware = (req: any, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || req.headers.Authorization;

    try {
        if (!token) {
            throw new Error("An Auth token is required for authentication");
        }
        
        req.user = jwt.verify(token.split(' ')[1], 'secret');
    } catch (error: any) {
        return res.status(403).send({
            message: error.message || 'Invalid Token',
        });
    }

    next();
}

export default AuthMiddleware